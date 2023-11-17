import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Topbar from '../../components/TopBar/Topbar';
import Button from '../../components/Button/Button';
import {useAppDispatch, useAppSelector} from '../../hooks/reduxHooks';
import {totalProduct} from '../../store/Cart/CartSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CartProduct from '../../components/Cart/CartProducts';
import {CartProducts} from '../../models/cart';

const CartScreen = () => {
  const token = useAppSelector(state => state.auth.token);
  const buttonPressed = useAppSelector(
    state => state.cartItems.isButtonPressed,
  );
  const [cart, setCart] = useState<CartProducts[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useAppDispatch();

  const result = cart.reduce((sum, item) => sum + (Number(item.qty) || 0), 0);

  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://apiv5.akilliticaretim.com/api/v5/sf/cart/cart-v2',
      headers: {
        GUID: '24BE-DB0E-D75E-4060',
        Authorization: `Bearer ${token}`,
      },
    }).then(response => {
      setTotalPrice(response.data.data.basket.totalPrice);
      setCart(response.data.data.detail);
      dispatch(totalProduct(result));
    });
  }, [buttonPressed, result, dispatch, token]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
      }}>
      <Topbar title={'Favorilerim'} />
      <View
        style={{
          flex: 0.9,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {result === 0 ? (
          <>
            <Ionicons
              name={'basket-outline'}
              size={200}
              style={{color: '#ff6f36'}}
            />
            <Text style={{fontSize: 20}}>Sepetiniz Boş</Text>
          </>
        ) : (
          <FlatList
            data={cart}
            keyExtractor={(item, index) => index.toString()}
            renderItem={product => (
              <>
                <CartProduct products={product.item} />
              </>
            )}
          />
        )}
      </View>

      <Text style={styles.price}>{totalPrice} TL</Text>
      <Text style={{color: '#c8c8c8', fontSize: 15, fontWeight: '700'}}>
        Teslimat Ücreti :{totalPrice / 100}
      </Text>
      <Button
        radius={4}
        backgroundColor={'#ff6f36'}
        textColor={'white'}
        text={'Sepeti Onayla'}
      />
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  price: {
    color: '#ff6f36',
    margin: 10,
    fontSize: 30,
    fontWeight: '700',
  },
});
