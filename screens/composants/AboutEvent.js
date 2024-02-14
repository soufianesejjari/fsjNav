import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
const  AboutEvent=({eventData})=>{
    return (  
         <View style={styles.about}>
      <Text style={styles.aboutTitle}>About</Text>
      <Text style={styles.aboutDescription}>
      {eventData}

      </Text>
    </View>)
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
        action: {
          width: 36,
          height: 36,
          backgroundColor: '#ffffff',
          borderWidth: 1,
          borderColor: '#e5e5e5',
          borderStyle: 'solid',
          borderRadius: 12,
          marginHorizontal: 8,
          alignItems: 'center',
          justifyContent: 'center',
        },
        actionWrapper: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          marginHorizontal: -8,
          marginBottom: 12,
        },
        /** Tabs */
        tabs: {
          flexDirection: 'row',
          paddingHorizontal: 0,
        },
        tabsItemWrapper: {
          marginRight: 28,
        },
        tabsItem: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 10,
          paddingBottom: 4,
        },
        tabsItemText: {
          fontWeight: '600',
          fontSize: 16,
          lineHeight: 20,
          color: '#7b7c7e',
        },
        tabsItemLine: {
          width: 20,
          height: 3,
          backgroundColor: '#f26463',
          borderRadius: 24,
        },
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
          paddingVertical: 10,
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
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderWidth: 1,
          backgroundColor: '#F26463',
          borderColor: '#F26463',
          height: 52,
        },
        btnSecondaryText: {
          fontSize: 16,
          lineHeight: 26,
          fontWeight: '700',
          color: '#fff',
        },
      });
    export default AboutEvent