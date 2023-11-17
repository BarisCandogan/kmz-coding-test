import {Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/Main/MainNavigator';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '../../hooks/reduxHooks';

type homeScreenProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  title: string;
};

const Topbar = ({title}: Props) => {
  const navigation = useNavigation<homeScreenProp>();
  const cart = useAppSelector(state => state.cartItems.cart);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()}>
        <AntDesign name="left" size={22} style={{color: 'grey', margin: 10}} />
      </Pressable>
      <Text style={{fontSize: 25, fontWeight: '700', color: '#ff6f36'}}>
        {title}
      </Text>
      <Pressable
        onPress={() => navigation.navigate('Cart')}
        style={{
          height: 40,
          marginRight: 10,
          alignItems: 'flex-end',
          justifyContent: 'flex-start',
        }}>
        {cart > 0 ? (
          <View style={styles.plusIcon}>
            <Text style={{color: 'white', fontSize: 10}}>{cart}</Text>
          </View>
        ) : null}
        <Ionicons
          name={cart > 0 ? 'basket' : 'basket-outline'}
          size={30}
          style={{color: 'grey'}}
        />
      </Pressable>
    </View>
  );
};

export default Topbar;

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'android' ? 30 : 0,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  plusIcon: {
    position: 'absolute',
    borderRadius: 100,
    backgroundColor: '#ff6f36',
    width: 12,
    height: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
