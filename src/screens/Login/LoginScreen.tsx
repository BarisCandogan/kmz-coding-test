import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Button from '../../components/Button/Button';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/Main/MainNavigator';
import {useAppDispatch} from '../../hooks/reduxHooks';
import {getToken} from '../../store/Auth/AuthSlice';

type homeScreenProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  const navigation = useNavigation<homeScreenProp>();
  const onSignInPressed = () => {
    axios({
      method: 'post',
      url: 'https://apiv5.akilliticaretim.com/api/v5/sf/auth/login',
      headers: {
        GUID: '24BE-DB0E-D75E-4060',
        'content-type': 'text/json',
      },
      data: {
        username: username,
        password: password,
      },
    })
      .then(response => {
        console.log(response);
        dispatch(getToken(response.data.data.token));
        navigation.navigate('DrawerNavigation');
      })
      .catch(() => Alert.alert('E-postanız veya Şifreniz Yanlış'));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Giriş</Text>

      <View style={{flex: 0.5}}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Kullanıcı Adı"
            style={styles.inputStyle}
            placeholderTextColor={'gray'}
            autoCapitalize="none"
            onChangeText={value => setUsername(value)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Şifre"
            style={styles.inputStyle}
            placeholderTextColor={'gray'}
            secureTextEntry={true}
            autoCapitalize="none"
            onChangeText={value => setPassword(value)}
          />
        </View>
      </View>
      <Button
        radius={100}
        backgroundColor={'white'}
        textColor={'#ff6f36'}
        onPress={onSignInPressed}
        text={'Giriş Yap'}
      />
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ff6f36',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    marginTop: 30,
    width: 300,
    borderRadius: 100,
    backgroundColor: 'white',
    height: 50,
  },
  inputStyle: {
    paddingLeft: 14,
    fontSize: 14,
    height: '100%',
    width: '100%',
  },
  title: {
    marginBottom: 40,
    color: 'white',
    fontSize: 50,
    fontWeight: '700',
  },
});
