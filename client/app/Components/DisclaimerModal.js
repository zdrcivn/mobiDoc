import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import CheckBox from '@react-native-community/checkbox';

export default function DisclaimerModal({visibility, okAlert}) {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  return (
    <View style={styles.mainContainer}>
      <View>
        <Modal animationType="fade" transparent={true} visible={visibility}>
          <ScrollView style={{backgroundColor: 'rgba(52, 52, 52, 0.8)'}}>
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.headlineText}>Disclaimer</Text>
                </View>

                <Text style={styles.disclaimerText}>
                  {'\n'} mobiDoc is based on a first-come, first-served basis.
                </Text>
                <Text style={styles.disclaimerText}>
                  {'\n'} Accepting appointments with each doctor that you select
                  is depending on their availability, which you may see in their
                  information.
                </Text>
                <Text style={styles.disclaimerText}>
                  {'\n'} If your appointment time does not match their
                  availability time, it will be refused and deleted on that day,
                  but you can try again tomorrow at earlier time.
                </Text>
                <Text style={styles.disclaimerText}>
                  {'\n'} This application only accepts modest consultations such
                  as mild symptoms of patients and concerns about various
                  ailments. If you have serious health concerns, you can go to
                  the local hospital and talk with your doctor.
                </Text>
                <View style={styles.checkboxContainer}>
                  <CheckBox
                    style={styles.checkboxStyle}
                    disabled={false}
                    value={toggleCheckBox}
                    onValueChange={newValue => setToggleCheckBox(newValue)}
                  />
                  <Text style={{fontFamily: 'Roboto-Italic', fontSize: 11}}>
                    By clicking this, you are confirming that you have read,
                    {'\n'}understand and agree the above terms and condition.
                  </Text>
                </View>
                <View style={{alignItems: 'center'}}>
                  <TouchableOpacity
                    style={[
                      styles.continueButton,
                      {
                        backgroundColor: toggleCheckBox ? '#0077b6' : 'grey',
                      },
                    ]}
                    disabled={!toggleCheckBox}
                    onPress={() => okAlert(false)}>
                    <Text style={{fontFamily: 'Roboto-Bold', color: '#fff'}}>
                      C O N T I N U E
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleText: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'rgba(0,0,0, .6)',
  },
  modalView: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: 35,
    marginHorizontal: 20,
    padding: 10,
  },
  disclaimerText: {
    fontSize: 15,
    fontFamily: 'Roboto-Medium',
    textAlign: 'justify',
  },
  headlineText: {
    fontSize: 35,
    fontFamily: 'Roboto-Bold',
    //color: 'dodgerblue',
    color: '#1f1f1f',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    alignItems: 'center',
  },
  checkboxStyle: {
    width: 30,
    height: 30,
  },
  continueButton: {
    padding: 20,
    borderRadius: 18,
  },
});
