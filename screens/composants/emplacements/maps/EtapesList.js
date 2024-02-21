import React from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
  Switch,
  TouchableOpacity,
  SafeAreaView,ScrollView
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import FeatherIcon from 'react-native-vector-icons/Feather';


const CIRCLE_SIZE = 18;
const CIRCLE_RING_SIZE = 2;



export default function EtapesList({ setCloseList, directions }) {
    const getIconForManeuver = (maneuver) => {
        // Fonction pour obtenir l'icône appropriée en fonction du type de manoeuvre
        switch (maneuver) {
          case 'turn-right':
            return 'arrow-right';
          case 'turn-left':
            return 'arrow-left';
          // Ajoutez d'autres cas selon les types de manœuvres que vous avez
          default:
            return 'arrow-up-right'; // Utilisation d'une flèche par défaut
        }
      };
    const extractText = (html) => {
        return html.replace(/<[^>]*>/g, ' '); // Utilise une expression régulière pour supprimer les balises HTML
      };
    const sheet = React.useRef();
  
    React.useEffect(() => {
      sheet.current.open();
    }, []);
  
    return (
      <SafeAreaView style={{ flex: 1 }}>
   
  
        <RBSheet
          customStyles={{ container: styles.sheet }}
          height={800}
          openDuration={250}
          ref={sheet}
          onClose={setCloseList}
        >
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetHeaderTitle}>Étapes de direction</Text>
          </View>
          <View style={styles.sheetBody}>
            <ScrollView contentContainerStyle={styles.container}>
              <Text style={styles.title}>Étapes</Text>
              {directions.map((step, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.cardIcon}>
            <FeatherIcon
              color="#7F27FF"
              name={index === directions.length - 1 ? "map-pin" : getIconForManeuver(step.maneuver)}
              size={30}
            />
          </View>

          <View style={styles.cardDelimiter}>
            {index !== directions.length - 1 && (
              <View style={styles.cardDelimiterLine} />
            )}

            <View
              style={[
                styles.cardDelimiterInset,
                !step.end && { backgroundColor: '#ffcb05' },
              ]}
            />
          </View>

          <View style={styles.cardBody}>
            <View style={styles.cardBodyContent}>
              <Text style={styles.cardTitle}>{extractText(step.html_instructions)}</Text>

              <Text style={styles.cardSubtitle}>{step.instructions}</Text>

              <Text style={styles.cardDates}>{step.distance.text}</Text>
            </View>

            <View style={styles.cardBodyAction}>
              <FeatherIcon
                color="#181818"
                name="arrow-right"
                size={16}
              />
            </View>
          </View>
        </View>
      ))}
            </ScrollView>
          </View>
        </RBSheet>
      </SafeAreaView>
    );
  }

const styles = StyleSheet.create({
  /** Option */
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fafafa',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 8,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0d0c22',
    marginBottom: 6,
  },
  optionText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    color: '#a8a8a8',
  },
  /** Circle */
  circle: {
    width: CIRCLE_SIZE + CIRCLE_RING_SIZE * 4,
    height: CIRCLE_SIZE + CIRCLE_RING_SIZE * 4,
    borderRadius: 9999,
    backgroundColor: 'white',
    borderWidth: CIRCLE_RING_SIZE,
    borderColor: '#d4d4d4',
    marginRight: 8,
    marginBottom: 12,
  },
  circleInside: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: 9999,
    position: 'absolute',
    top: CIRCLE_RING_SIZE,
    left: CIRCLE_RING_SIZE,
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
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  sheetHeaderTitle: {
  //  color:'bl',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  sheetBody: {
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  /** Section */
  section: {
    paddingTop: 24,
  },
  sectionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#b1b1b1',
    textTransform: 'uppercase',
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  /** Button */
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    padding: 14,
    borderWidth: 1,
    borderColor: '#7259e2',
    marginTop: 24,
    backgroundColor: '#7259e2',
  },
  btnText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FF8911',
    marginBottom: 12,
  },
  /** Card */
  card: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardDelimiter: {
    position: 'relative',
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  cardDelimiterLine: {
    position: 'absolute',
    left: 30,
    top: '50%',
    borderLeftWidth: 1,
    borderColor: '#eee',
    height: '100%',
    zIndex: 1,
  },
  cardDelimiterInset: {
    width: 12,
    height: 12,
    borderWidth: 3,
    borderRadius: 9999,
    backgroundColor: '#fff',
    borderColor: '#ffcb05',
    zIndex: 9,
    position: 'relative',
  },
  cardBody: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  cardBodyContent: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#2a2a2a',
    marginBottom: 3,
  },
  cardSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#464646',
    marginBottom: 3,
  },
  cardDates: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ababab',
  },
  cardBodyAction: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    maxWidth: 28,
    alignItems: 'flex-end',
  },
});