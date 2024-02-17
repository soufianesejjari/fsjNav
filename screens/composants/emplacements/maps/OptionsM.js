import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import RBSheet from 'react-native-raw-bottom-sheet';

export default function OptionM() {
  const [selected, setSelected] = React.useState(0);
  const sheet = React.useRef();

  React.useEffect(() => {
    sheet.current.open();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.placeholder}>
        <View style={styles.placeholderInset}>
          {/* Replace with your content */}
        </View>
      </View>

      <RBSheet
        customStyles={{ container: styles.sheet }}
        height={440}
        openDuration={250}
        ref={sheet}>
        <View style={styles.sheetHeader}>
          <Text style={styles.sheetTitle}>Address</Text>
          <Text style={styles.sheetText}>
            123 Mission Rd{'\n'}San Francisco, CA 94080
          </Text>
        </View>
        <View style={styles.sheetBody}>
          <View style={styles.sheetBodyOptions}>
            <TouchableOpacity
              style={[
                styles.sheetBodyOption,
                selected === 0 && { borderColor: '#000' },
              ]}
              onPress={() => setSelected(0)}>
              <FeatherIcon
                name="map"
                color={selected === 0 ? '#000' : '#bcbdd9'}
                size={24}
              />
              <Text
                style={[
                  styles.sheetBodyOptionText,
                  selected === 0 && { color: '#000' },
                ]}>
                Option 1
              </Text>
            </TouchableOpacity>
            <View style={styles.delimiter} />
            <TouchableOpacity
              style={[
                styles.sheetBodyOption,
                selected === 1 && { borderColor: '#000' },
              ]}
              onPress={() => setSelected(1)}>
              <FeatherIcon
                name="globe"
                color={selected === 1 ? '#000' : '#bcbdd9'}
                size={24}
              />
              <Text
                style={[
                  styles.sheetBodyOptionText,
                  selected === 1 && { color: '#000' },
                ]}>
                Option 2
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>Place an order</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  delimiter: {
    height: '100%',
    width: 1,
    backgroundColor: '#ebebf5',
  },
  /** Placeholder */
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: 400,
    marginTop: 0,
    padding: 24,
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
  /** Sheet */
  sheet: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  sheetHeader: {
    paddingVertical: 24,
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#bcbdd9',
  },
  sheetText: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000000',
    marginTop: 12,
  },
  sheetBody: {
    padding: 24,
  },
  sheetBodyOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 48,
    marginHorizontal: -16,
  },
  sheetBodyOption: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 12,
    marginHorizontal: 16,
    paddingVertical: 28,
  },
  sheetBodyOptionText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 12,
    color: '#bcbdd9',
  },
  /** Button */
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    padding: 14,
    borderWidth: 1,
    borderColor: '#000000',
    marginBottom: 12,
    backgroundColor: '#000000',
  },
  btnText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
});