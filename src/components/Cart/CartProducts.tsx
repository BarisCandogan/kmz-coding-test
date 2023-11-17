import {
  Alert,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {CartProducts} from '../../models/cart';
import axios from 'axios';
import {useAppDispatch, useAppSelector} from '../../hooks/reduxHooks';
import {pressed} from '../../store/Cart/CartSlice';

type Props = {
  products: CartProducts;
};

const CartProduct = ({products}: Props) => {
  const token = useAppSelector(state => state.auth.token);
  const buttonPressed = useAppSelector(
    state => state.cartItems.isButtonPressed,
  );
  const dispatch = useAppDispatch();
  const onDeletePressed = (cartId: number) => {
    axios({
      method: 'delete',
      url: `https://apiv5.akilliticaretim.com/api/v5/sf/cart/cart?CartId=${cartId}`,
      headers: {
        GUID: '24BE-DB0E-D75E-4060',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        dispatch(pressed(true));
        if (buttonPressed) {
          dispatch(pressed(false));
        }
      })
      .catch(() => Alert.alert('Ürün Kaldırma Başarısız'));
  };

  const onButtonPressed = (item: CartProducts, quantity: number) => {
    axios({
      method: 'put',
      url: 'https://apiv5.akilliticaretim.com/api/v5/sf/cart/cart',
      headers: {
        GUID: '24BE-DB0E-D75E-4060',
        'content-type': 'text/json',
        Authorization: `Bearer ${token}`,
      },
      data: {
        cartId: item.cartID,
        productId: item.id,
        qty: quantity,
        userId: 4,
      },
    })
      .then(() => {
        dispatch(pressed(true));
        if (buttonPressed) {
          dispatch(pressed(false));
        }
      })
      .catch(() => Alert.alert('Beklenmedik Bir Hata Oluştu'));
  };

  return (
    <View key={products.id} style={[styles.products]}>
      <View style={{alignItems: 'center', flexDirection: 'row'}}>
        <ImageBackground
          source={{
            uri: products.productImage,
          }}
          style={{
            width: 60,
            height: 60,
            margin: 20,
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
          }}>
          <Pressable
            style={[
              styles.plusIcon,
              {
                backgroundColor: '#ff6f36',
                width: 20,
                height: 20,
              },
            ]}>
            <Text style={{color: 'white'}}>{products.qty}</Text>
          </Pressable>
        </ImageBackground>
        <View style={{width: 200}}>
          <Text
            style={{
              color: 'black',
              fontWeight: '600',
            }}>
            {products.stockName}
          </Text>
          <View style={styles.buttonContainer}>
            <Pressable
              onPress={() => onButtonPressed(products, products.qty + 1)}
              style={[
                styles.plusIcon,
                {backgroundColor: 'white', width: 25, height: 25},
              ]}>
              <AntDesign name="plus" color="#ff6f36" size={18} />
            </Pressable>
            <Pressable
              onPress={() => onButtonPressed(products, products.qty - 1)}
              style={[
                styles.plusIcon,
                {backgroundColor: 'white', width: 25, height: 25},
              ]}>
              <AntDesign name="minus" color="#ff6f36" size={18} />
            </Pressable>
          </View>
        </View>
        <View
          style={{
            marginLeft: 20,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Pressable onPress={() => onDeletePressed(products.cartID)}>
            <EvilIcons name="trash" color="#8f8f8f" size={30} />
          </Pressable>
          <Text style={styles.currency}>
            {products.salePrice} {products.currency}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CartProduct;

const styles = StyleSheet.create({
  products: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#c8c8c8',
  },
  buttonContainer: {
    width: 180,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  plusIcon: {
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 100,

    alignItems: 'center',
    justifyContent: 'center',
  },
  currency: {
    marginTop: 10,
    fontSize: 16,
    color: '#ff6f36',
    fontWeight: '700',
  },
  price: {
    color: '#ff6f36',
    margin: 10,
    fontSize: 30,
    fontWeight: '700',
  },
});
