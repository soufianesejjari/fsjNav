import React from 'react';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

const items = [
  {
    icon: 'users',
    label: 'Clients',
    value: 832,
  },
  {
    icon: 'grid',
    label: 'Views',
    value: 8,
  },
  {
    icon: 'archive',
    label: 'Projects',
    value: 222,
  },
  {
    icon: 'columns',
    label: 'Boards',
    value: 48,
  },
  {
    icon: 'list',
    label: 'Tasks',
    value: 83,
  },
];

export default function Example() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8E2F7' }}>
      <View style={styles.container}>
        <Text style={styles.title}>Dashboard</Text>

        <View style={styles.stats}>
          {items.map(({ icon, label, value }, index) => (
            <View key={index} style={styles.statsItem}>
              <FeatherIcon color="#8C6CAB" name={icon} size={14} />

              <Text style={styles.statsItemLabel}>{label}</Text>

              <Text style={styles.statsItemValue}>{value}</Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 12,
  },
  /** Stats */
  stats: {
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  statsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  statsItemLabel: {
    marginLeft: 8,
    marginRight: 'auto',
    fontSize: 15,
    fontWeight: '600',
    color: '#4e4a6d',
  },
  statsItemValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4e4a6d',
  },
});