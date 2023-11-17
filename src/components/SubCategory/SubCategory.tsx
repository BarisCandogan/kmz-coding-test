import {Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';

import axios from 'axios';
import {Products} from '../../models/products';
import {useAppDispatch} from '../../hooks/reduxHooks';
import {getProducts} from '../../store/Category/CategorySlice';

type Props = {
  subCategory: Products;
  selected: number;
  setSelected: any;
};

const SubCategory = ({subCategory, selected, setSelected}: Props) => {
  const dispatch = useAppDispatch();

  const onCategoryPressed = () => {
    setSelected(subCategory.id);
    axios({
      method: 'get',
      url: `https://apiv5.akilliticaretim.com/api/v5/sf/product/category_products?Id=${subCategory.id}&PageNumber=1&PageSize=10`,
      headers: {
        GUID: '24BE-DB0E-D75E-4060',
      },
    }).then(response => {
      dispatch(getProducts(response.data.data));
    });
  };

  return (
    <>
      <Pressable
        onPress={() => onCategoryPressed()}
        style={[
          styles.categoryBackground,
          {
            backgroundColor:
              selected === subCategory.id ? '#ff6f36' : '#dedede',
          },
        ]}>
        <Text
          style={[
            styles.categoryName,
            {
              color: selected === subCategory.id ? 'white' : 'grey',
            },
          ]}>
          {subCategory.categoryName}
        </Text>
      </Pressable>
    </>
  );
};

export default SubCategory;

const styles = StyleSheet.create({
  categoryBackground: {
    height: 50,
    margin: 10,
    borderRadius: 100,
    width: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryName: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 11,
    width: 100,
  },
});
