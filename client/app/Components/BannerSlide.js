import {View, Image} from 'react-native';
import React from 'react';

export default function BannerSlide({data}) {
  return (
    <View>
      <Image
        source={data.image}
        style={{height: 250, width: 300, borderRadius: 10}}
      />
    </View>
  );
}
