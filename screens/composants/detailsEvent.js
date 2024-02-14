import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import Swiper from 'react-native-swiper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Test2ev from './Test2evnt';

const items = [
  { name: 'Overview' },
  { name: 'Tour' },
  { name: 'Information' },
  { name: 'Reviews' },
];
const IMAGES = [
  'https://assets.withfra.me/Detailed.4--hero.png',
  'https://images.unsplash.com/photo-1639358336404-b847ac2a3272?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
  'https://images.unsplash.com/photo-1652509525608-6b44097ea5a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjN8fHRlc2xhJTIwbW9kZWwlMjBzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
];

export default function DetailEvent({eventData}) {
  const [value, setValue] = React.useState(0);

  return (
    <View style={{ flex: 1, backgroundColor: '#F9F9F9' }}>
      

      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        <View style={styles.photos}>
          <Swiper
            renderPagination={(index, total) => (
              <View style={styles.photosPagination}>
                <Text style={styles.photosPaginationText}>
                  {index + 1} / {total}
                </Text>
              </View>
            )}>
              <View style={{ flex: 1 }}>
                <Image
                  alt=""
                  source={{ uri: eventData.eventImage }}
                  style={styles.photosImg} />
              </View>
          </Swiper>
        </View>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{eventData.eventName} </Text>

          <View style={styles.headerRow}>
            <View style={styles.headerLocation}>
              <FeatherIcon
                color="#7B7C7E"
                name="map-pin"
                size={14} />

              <Text style={styles.headerLocationText}>
                {eventData.eventLocation.name}, Fs el Jadida
              </Text>
            </View>

   </View>

          <View style={styles.headerRow}>
          {/*   <View style={styles.headerStars}>
              <FontAwesome
                color="#f26463"
                name="star"
                solid={true}
                size={14} />

              <FontAwesome
                color="#f26463"
                name="star"
                solid={true}
                size={14} />

              <FontAwesome
                color="#f26463"
                name="star"
                solid={true}
                size={14} />

              <FontAwesome
                color="#f26463"
                name="star"
                solid={true}
                size={14} />

              <FontAwesome color="#f26463" name="star" size={14} />

              <Text style={styles.headerStarsText}>20 reviews</Text>
            </View> */}

            <Text style={styles.headerDistance}>{eventData.eventDuration}</Text>
          </View>
        </View>
        <View style={styles.picker}>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
            style={styles.pickerDates}>
            <FeatherIcon
              color="#242329"
              name="calendar"
              size={16} />

            <Text style={styles.pickerDatesText}>{eventData.eventDate} {eventData.eventHeure}</Text>
          </TouchableOpacity>

          <View style={styles.pickerFilterWrapper}>
        {/*     <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
              style={styles.pickerFilter}>
              <View style={styles.pickerFilterItem}>
                <FontAwesome color="#242329" name="bed" size={16} />

                <Text style={styles.pickerFilterItemText}>1</Text>
              </View>

              <View style={styles.pickerFilterItem}>
                <FeatherIcon
                  color="#242329"
                  name="users"
                  size={16} />

                <Text style={styles.pickerFilterItemText}>2</Text>
              </View>
            </TouchableOpacity> */}
          </View>
        </View>
  {/*       <View style={styles.stats}>
          <View style={styles.statsItem}>
            <FontAwesome color="#7B7C7E" name="wifi" size={15} />

            <Text style={styles.statsItemText}>Wifi</Text>
          </View>

          <View style={styles.statsItem}>
            <FontAwesome color="#7B7C7E" name="car" size={15} />

            <Text style={styles.statsItemText}>Airport Pickup</Text>
          </View>

          <View style={styles.statsItem}>
            <FontAwesome color="#7B7C7E" name="coffee" size={15} />

            <Text style={styles.statsItemText}>Lunch Included</Text>
          </View>
        </View> */}

      </ScrollView>

      <View style={styles.overlay}>
        <View style={styles.footer}>
       
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
            style={{ flex: 1, paddingHorizontal: 8 }}>
            <View style={styles.btnSecondary}>
              <Text style={styles.btnSecondaryText}>Map vers event</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  actions: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 48,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  footer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  /** Action */
 

 
  /** Photos */
  photos: {
    paddingTop: 6,
    paddingHorizontal: 20,
    marginTop: 12,
    position: 'relative',
    height: 240,
    overflow: 'hidden',
    borderRadius: 12,
  },
  photosPagination: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: '#242329',
    borderRadius: 31,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  photosPaginationText: {
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 18,
    color: '#ffffff',
  },
  photosImg: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    width: '100%',
    height: 240,
    borderRadius: 12,
  },
  /** Header */
  header: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontWeight: '700',
    fontSize: 22,
    lineHeight: 32,
    color: '#242329',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  headerLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLocationText: {
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 20,
    color: '#7b7c7e',
    marginLeft: 4,
  },
  headerPrice: {
    fontWeight: '700',
    fontSize: 22,
    lineHeight: 32,
    textAlign: 'right',
    color: '#f26463',
  },
  headerStars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerStarsText: {
    marginLeft: 8,
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 20,
    color: '#7b7c7e',
  },
  headerDistance: {
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 20,
    color: '#7b7c7e',
  },
  /** Picker */
  picker: {
    marginTop: 6,
    marginHorizontal: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    height: 48,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e3e3e3',
    borderStyle: 'solid',
    borderRadius: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pickerDates: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerDatesText: {
    marginLeft: 8,
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 18,
    color: '#242329',
  },
  pickerFilterWrapper: {
    borderLeftWidth: 1,
    borderColor: '#e5e5e5',
    paddingLeft: 12,
  },
  pickerFilter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerFilterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  pickerFilterItemText: {
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 18,
    textAlign: 'center',
    color: '#242329',
    marginLeft: 4,
  },
  /** Stats */
  stats: {
    marginVertical: 16,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statsItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsItemText: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    color: '#242329',
    marginLeft: 7,
  },
  /** About */
  about: {
    marginHorizontal: 20,
  },
  aboutTitle: {
    fontWeight: '700',
    fontSize: 22,
    lineHeight: 32,
    color: '#242329',
    marginBottom: 4,
  },
  aboutDescription: {
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 20,
    color: '#7b7c7e',
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 0,
    paddingHorizontal: 36,
    borderWidth: 1,
    backgroundColor: '#242329',
    borderColor: '#242329',
    height: 52,
  },
  btnText: {
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '700',
    color: '#fff',
  },
  btnSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#FF8911',
    borderColor: '#FF8911',
    height: 52,
  },
  btnSecondaryText: {
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '700',
    color: '#fff',
  },
});