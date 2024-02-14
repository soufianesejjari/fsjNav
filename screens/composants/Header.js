import React, { Children } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export default function Header({Children}) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FBFCFF' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerAction}>
            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}>
              <FeatherIcon name="chevron-left" size={24} />
            </TouchableOpacity>
          </View>

          <View style={styles.headerSearch}>
            <View style={styles.headerSearchIcon}>
              <FeatherIcon
                color="#121A26"
                name="search"
                size={19} />
            </View>

            <TextInput
              autoCapitalize="words"
              autoComplete="name"
              placeholder="Jackson Wilson"
              placeholderTextColor="#778599"
              style={styles.headerSearchInput} />
          </View>

          <View style={[styles.headerAction, { alignItems: 'flex-end' }]}>
            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}>
              <FeatherIcon name="more-vertical" size={24} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.placeholder}>
          <View style={styles.placeholderInset}>
            {Children}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  /** Header */
  header: {
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerSearch: {
    position: 'relative',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  headerSearchIcon: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  headerSearchInput: {
    backgroundColor: '#fff',
    width: '100%',
    height: 40,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    fontWeight: '500',
    paddingLeft: 40,
    shadowColor: '#90a0ca',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 2,
  },
  /** Placeholder */
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: 400,
    marginTop: 0,
    padding: 0,
    backgroundColor: 'transparent',
  },
  placeholderInset: {
    borderWidth: 4,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
    borderRadius: 9,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});