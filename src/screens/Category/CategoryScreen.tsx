import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Topbar from '../../components/TopBar/Topbar';
import {useAppDispatch, useAppSelector} from '../../hooks/reduxHooks';
import SubCategory from '../../components/SubCategory/SubCategory';
import CategoryProduct from '../../components/CategoryProduct/CategoryProduct';
import axios from 'axios';
import {getProducts} from '../../store/Category/CategorySlice';

const CategoryScreen = () => {
  const [selected, setSelected] = useState(0);
  const categories = useAppSelector(state => state.categories.category);
  const products = useAppSelector(state => state.categories.product);
  const dispatch = useAppDispatch();

  useEffect(() => {
    axios({
      method: 'get',
      url: `https://apiv5.akilliticaretim.com/api/v5/sf/product/category_products?Id=${categories[0].id}&PageNumber=1&PageSize=10`,
      headers: {
        GUID: '24BE-DB0E-D75E-4060',
      },
    }).then(response => {
      dispatch(getProducts(response.data.data));
    });

    setSelected(categories[0].id);
  }, [categories, dispatch, setSelected]);

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <Topbar title={'Ürünler'} />
      <View style={styles.listContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          renderItem={product => (
            <SubCategory
              selected={selected}
              setSelected={setSelected}
              subCategory={product.item}
            />
          )}
        />
      </View>

      <View style={{flex: 0.85, alignItems: 'center'}}>
        <FlatList
          data={products}
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
          renderItem={product => (
            <>
              <CategoryProduct products={product.item} />
            </>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  listContainer: {
    justifyContent: 'center',
    flex: 0.12,
    borderBottomWidth: 1,
    borderColor: '#dedede',
  },
});
