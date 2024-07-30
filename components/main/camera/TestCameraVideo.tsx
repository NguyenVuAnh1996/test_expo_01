import axios from "axios";
import { ResizeMode, Video } from "expo-av";
import { CameraType, CameraView, useCameraPermissions, useMicrophonePermissions } from "expo-camera";
import * as FileSystem from 'expo-file-system';
import { useRef, useState } from "react";
import { Button, Dimensions, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FormData from "form-data";
import { backendHead } from "@/constants/Others";
import { VidCompressor } from "@/no_expogo/VidCompressor";

interface ClipEntity {
  id: number
  url: string
}

const clipFileType = 'mp4';

const convertNowToFilename = () => {
  const now = new Date();

  const padZero = (input: number) => {
    let _input = String(input);
    if (_input.length > 2) return _input;
    return _input.padStart(2, '0');
  }

  return [
    padZero(now.getFullYear()),
    padZero(now.getMonth() + 1),
    padZero(now.getDate()),
    padZero(now.getHours()),
    padZero(now.getMinutes()),
    padZero(now.getSeconds()),
  ].join('_') + '.' + clipFileType;
}

const screenWidth = Dimensions.get("window").width;

export default function TestCameraVideo() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [microphonePermission, requestMicrophonePermission] = useMicrophonePermissions();
  const [videoUri, setVideoUri] = useState<string>('');
  const cameraRef = useRef<CameraView>(null);
  const [isCameraReady, setCameraReady] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);

  const videoRef = useRef<Video>(null);
  const [videos, setVideos] = useState<ClipEntity[]>([]);
  const [videoListModalOpen, setVideoListModalOpen] = useState<boolean>(false);

  if (!cameraPermission || !microphonePermission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!cameraPermission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestCameraPermission} title="grant permission" />
      </View>
    );
  }

  if (!microphonePermission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to record from microphone</Text>
        <Button onPress={requestMicrophonePermission} title="grant permission" />
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const startRecording = async () => {
    setIsRecording(true);
    if (!isCameraReady) return;
    const video = await cameraRef.current?.recordAsync();
    setIsRecording(false);
    if (video) {
      const uriBefore = video.uri;
      console.log('file type before: ', uriBefore.substring(uriBefore.lastIndexOf(".")));
      const fileInfo: any = await FileSystem.getInfoAsync(video.uri, {
        size: true
      });
      console.log('file size before:', fileInfo.size.toLocaleString());

      const result = await VidCompressor.compress(uriBefore);
      console.log('file type after: ', result.substring(result.lastIndexOf(".")));
      const fileInfoAfter: any = await FileSystem.getInfoAsync(result, {
        size: true
      });
      console.log('file size after:', fileInfoAfter.size.toLocaleString());
      setVideoUri(result);
    }
  }

  const stopRecording = () => {
    cameraRef.current?.stopRecording();
  }

  const handleUpload = async () => {
    if (videoUri === '') return;
    let formData = new FormData();
    formData.append('file', {
      name: convertNowToFilename(),
      type: `video/${clipFileType}`,
      uri: videoUri
    })
    axios.post('api/Clip/upload', formData, {
      headers: {
        'Accept': '*/*',
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(res => {
        console.log('success');
        setVideoUri('');
      })
      .catch(err => {
        if (err.response) {
          let errRes = err.response;
          console.log('vuanhErr:', errRes.data)
        } else {
          console.log('there is no error response')
        }
      })
  }

  const getAllVideos = () => {
    axios.get('api/Clip/')
      .then(res => {
        setVideos(res.data);
        setVideoListModalOpen(true);
      })
      .catch(err => {
        if (err.response) {
          let errRes = err.response;
          console.log('vuanhErr:', errRes.data)
        }
      })
  }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} mode="video" style={styles.camera} facing={facing}
        onCameraReady={() => setCameraReady(true)}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={startRecording}
            disabled={isRecording}
          >
            <Text style={styles.text}>Start</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={stopRecording}
            disabled={!isRecording}
          >
            <Text style={styles.text}>Stop</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
      {isRecording && <Text style={styles.recordingIndicator}>RECORDING ...</Text>}
      <View style={{
        flex: 1
      }}>
        {videoUri !== '' &&
          <>
            <Video
              style={{
                width: screenWidth * 0.75,
                height: screenWidth * 0.25
              }}
              source={{
                uri: videoUri
              }}
              resizeMode={ResizeMode.CONTAIN}
              useNativeControls
              ref={videoRef}
            />
          </>
        }
      </View>
      <View style={{
        flex: 1,
        flexDirection: 'row',
        gap: 10,
        padding: 20
      }}>
        <Pressable style={styles.uploadBtn} onPress={handleUpload}>
          <Text>Upload</Text>
        </Pressable>
        <Pressable style={styles.showVideoListBtn} onPress={getAllVideos}>
          <Text>Video list</Text>
        </Pressable>
      </View>
      <VideosListModal
        videos={videos}
        modelOpen={videoListModalOpen}
        setModalOpen={setVideoListModalOpen}
      />
    </View>
  )
}

const VideosListModal = ({
  videos,
  modelOpen,
  setModalOpen
}: {
  videos: ClipEntity[]
  modelOpen: boolean
  setModalOpen: (input: boolean) => void
}) => {
  const [videoModalOpen, setVideoModalOpen] = useState<boolean>(false);
  const [videoUrl, setVideoUrl] = useState<string>('');

  const handleCloseVideoModal = () => {
    setVideoModalOpen(false);
    setVideoUrl('');
  }

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modelOpen}
        onRequestClose={() => setModalOpen(false)}
      >
        <View style={{
          flex: 1,
          backgroundColor: 'lightgreen',
          padding: 20
        }}>
          <Pressable
            style={styles.closeModalBtn}
            onPress={() => setModalOpen(false)}
          >
            <Text style={{
              color: 'white',
            }}>X</Text>
          </Pressable>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap'
          }}>
            {videos.map(x =>
              <Pressable key={x.id} style={{
                width: '100%',
                padding: 20,
                backgroundColor: 'white',
                marginBottom: 20
              }} onPress={() => {
                setVideoUrl(x.url);
                setVideoModalOpen(true);
              }}>
                <Text>{x.url}</Text>
              </Pressable>
            )}
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        visible={videoModalOpen}
        onRequestClose={handleCloseVideoModal}
        style={{
          backgroundColor: 'black'
        }}
      >
        <View style={{
          flex: 1,
          position: 'relative',
          backgroundColor: 'black'
        }}>
          <Pressable
            style={{
              top: 20,
              right: 20,
              zIndex: 2,
              position: 'absolute',
              width: 40,
              height: 40,
              borderRadius: 30,
              backgroundColor: 'grey',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={handleCloseVideoModal}
          >
            <Text style={{
              color: 'white',
              fontWeight: 'bold'
            }}>X</Text>
          </Pressable>
          {videoUrl &&
            <Video
              source={{
                uri: backendHead + 'videos/' + videoUrl
              }}
              resizeMode={ResizeMode.CONTAIN}
              useNativeControls
              style={{
                flex: 1
              }}
            />
          }
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    height: 500
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  recordingIndicator: {
    fontWeight: 'bold',
    color: 'purple',
    fontSize: 24,
    textAlign: 'center',
    margin: 10
  },
  uploadBtn: {
    width: 120,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue'
  },
  pickerBtn: {
    width: 120,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'salmon'
  },
  showVideoListBtn: {
    width: 120,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgreen'
  },
  closeModalBtn: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end'
  }
});