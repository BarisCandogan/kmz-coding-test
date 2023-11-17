import {FlatList, Text, View, Pressable, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/Main/MainNavigator';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../../hooks/reduxHooks';
import {getCategory} from '../../store/Category/CategorySlice';

type homeScreenProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const [category, setCategory] = useState();
  const navigation = useNavigation<homeScreenProp>();
  const dispatch = useAppDispatch();
  const onCategoryPressed = (id: number) => {
    axios({
      method: 'get',
      url: `https://apiv5.akilliticaretim.com/api/v5/ad/product/categories?parentId=${id}`,
      headers: {
        GUID: '24BE-DB0E-D75E-4060',
      },
    }).then(response => {
      dispatch(getCategory(response.data.data.categories));
      navigation.navigate('Category');
    });
  };

  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://apiv5.akilliticaretim.com/api/v5/ad/product/categories',
      headers: {
        GUID: '24BE-DB0E-D75E-4060',
      },
    })
      .then(response => {
        setCategory(response.data.data.categories);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{
          flexGrow: 0.7,
          justifyContent: 'center',
        }}
        data={category}
        numColumns={3}
        renderItem={product => (
          <Pressable
            onPress={() => onCategoryPressed(product.item.id)}
            style={({pressed}) => [
              styles.categoryBackground,
              {opacity: pressed ? 0.5 : 1},
            ]}>
            <Text style={styles.categoryText}>{product.item.categoryName}</Text>
          </Pressable>
        )}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    flex: 1,
  },
  categoryBackground: {
    height: 100,
    margin: 10,
    width: 100,
    borderRadius: 20,
    backgroundColor: '#ff6f36',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'grey',
    shadowOffset: {width: 2, height: 5},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 7,
  },
  categoryText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 12,
  },
  text: {
    margin: 50,
    fontSize: 30,
    color: 'black',
    fontWeight: '600',
  },
});
