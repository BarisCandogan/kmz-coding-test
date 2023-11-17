import {Alert, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import axios from 'axios';
import {useAppDispatch, useAppSelector} from '../../hooks/reduxHooks';
import {increase} from '../../store/Cart/CartSlice';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {CategoryProducts} from '../../models/categoryProduct';

type Props = {
  products: CategoryProducts;
};

const CategoryProduct = ({products}: Props) => {
  const token = useAppSelector(state => state.auth.token);
  const dispatch = useAppDispatch();

  const onProductPressed = (item: CategoryProducts) => {
    axios({
      method: 'post',
      url: 'https://apiv5.akilliticaretim.com/api/v5/sf/cart/cart',
      headers: {
        GUID: '24BE-DB0E-D75E-4060',
        'content-type': 'text/json',
        Authorization: `Bearer ${token}`,
      },
      data: {
        productId: item.id,
        amount: 1,
      },
    })
      .then(response => {
        console.log(response);
        dispatch(increase());
        Alert.alert('Ürün Sepetinize Eklendi');
      })
      .catch(() => Alert.alert('Ürün Ekleme Başarısız'));
  };

  return (
    <View key={products.id} style={[styles.productBackground]}>
      <Pressable
        onPress={() => onProductPressed(products)}
        style={styles.plusIcon}>
        <AntDesign name="plus" color="white" size={20} />
      </Pressable>
      <View style={{alignItems: 'center'}}>
        <Image
          source={{
            uri: products.productImages[0].imagePath,
          }}
          style={{width: 80, height: 80}}
        />
        <Text
          style={{
            color: 'black',
            textAlign: 'center',
            fontWeight: '600',
          }}>
          {products.stockName}
        </Text>
      </View>
    </View>
  );
};

export default CategoryProduct;

const styles = StyleSheet.create({
  productBackground: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    height: 150,
    margin: 20,
    width: 90,
  },
  plusIcon: {
    borderRadius: 100,
    backgroundColor: '#c8c8c8',
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
