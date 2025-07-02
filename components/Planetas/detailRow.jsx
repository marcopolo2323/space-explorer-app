// detailRow.jsx
import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

const DetailRow = ({ title, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailTitle}>{title}:</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

export default DetailRow;