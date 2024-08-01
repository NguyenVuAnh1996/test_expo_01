import axios, { AxiosResponse } from 'axios';
import { CameraView, CameraType, useCameraPermissions, Camera } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, Dimensions, Image, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import FormData from "form-data";
import { getFileTypeFromUri } from '@/lib/utils';
import { backendHead } from '@/constants/Others';
import { useTryCatchPending } from '@/hooks/useTryCatchPending';

const imageFileTypes = ['png', 'jpg', 'jpeg', 'heic'];

interface ImageEntity {
  id: number
  url: string
}

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
  ].join('_');
}

const screenWidth = Dimensions.get("window").width;

export default function TestCamera() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const ref = useRef<CameraView>(null);
  const [isCameraReady, setCameraReady] = useState<boolean>(false);
  const [isTakingPic, startTakingPic] = useTryCatchPending();
  const [isUploading, startUploading] = useTryCatchPending();
  const [isGettingList, startGettingList] = useTryCatchPending();
  const [imgUri, setImgUri] = useState<string>('');
  const [images, setImages] = useState<ImageEntity[]>([]);
  const [imageListModalOpen, setImageListModalOpen] = useState<boolean>(false);


  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const takePic = async () => {
    if (!isCameraReady || isTakingPic) return;
    startTakingPic(
      async () => {
        const picture = await ref.current?.takePictureAsync();
        if (picture) {
          let str = picture.uri;
          let fileType = str.substring(str.lastIndexOf("."));
          console.log('file type: ', fileType);
          setImgUri(str);
        }
      },
      err => console.log('error when taking pic')
    )
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImgUri(result.assets[0].uri);
    }
  }

  const handleUploadImage = async () => {
    if (imgUri === '') return;
    startUploading(
      async () => {
        let formData = new FormData();
        let _fileType = getFileTypeFromUri(imgUri);
        formData.append('file', {
          name: convertNowToFilename() + _fileType,
          type: `image/${_fileType.slice(1)}`,
          uri: imgUri
        })
        await axios.post('api/Image/upload', formData, {
          headers: {
            'Accept': imageFileTypes.map(x => `image/${x}`).join(','),
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('success');
        setImgUri('');
      },
      err => {
        if (err.response) {
          let errRes = err.response;
          console.log('vuanhErr:', errRes.data)
        } else {
          console.log('there is no error response')
        }
      }
    )
  }

  const getAllImages = async () => {
    startGettingList(
      async () => {
        const result = await axios.get('api/Image/');
        setImages(result.data);
        setImageListModalOpen(true);
      },
      err => {
        if (err.response) {
          let errRes = err.response;
          console.log('vuanhErr:', errRes.data)
        }
      }
    )
  }

  return (
    <View style={styles.container}>
      <CameraView ref={ref} style={styles.camera} facing={facing}
        onCameraReady={() => setCameraReady(true)}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePic}>
            <Text style={styles.text}>Take picture</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
      <View style={{
        flex: 1
      }}>
        {imgUri !== '' &&
          <>
            <Image
              style={{
                width: 100,
                height: 100,
                objectFit: 'contain'
              }}
              source={{
                uri: imgUri
              }}
            />
            <Text>Image taken</Text>
          </>
        }
      </View>
      <View style={{
        flex: 1,
        flexDirection: 'row',
        gap: 10,
        padding: 20
      }}>
        <Pressable style={styles.pickerBtn} onPress={pickImage}>
          <Text>Chọn từ thư mục</Text>
        </Pressable>
        <Pressable disabled={isUploading} style={styles.uploadBtn} onPress={handleUploadImage}>
          <Text>Upload</Text>
        </Pressable>
        <Pressable disabled={isGettingList} style={[
          styles.showImgListBtn,
          { opacity: isGettingList ? 0.7 : 1 }
        ]} onPress={getAllImages}>
          <Text>Image list</Text>
        </Pressable>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={imageListModalOpen}
        onRequestClose={() => setImageListModalOpen(false)}
      >
        <View style={{
          flex: 1,
          backgroundColor: 'lightgreen',
          padding: 20
        }}>
          <Pressable
            style={styles.closeModalBtn}
            onPress={() => setImageListModalOpen(false)}
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
            {images.map(x =>
              <Image
                key={x.id}
                style={{
                  width: screenWidth / 5,
                  height: screenWidth / 4,
                  objectFit: 'contain',
                  margin: 5
                }}
                src={`${backendHead}images/${x.url}`}
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
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
    backgroundColor: 'transparent',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'green',
    width: 200,
    padding: 10
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
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
  showImgListBtn: {
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