import React, { useRef, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Signature from 'react-native-signature-canvas';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';

const SignatureModal = ({ visible, onClose, onConfirm, contractId, contractorId, signedBy }) => {
  const signatureRef = useRef(null);
  const [error, setError] = useState('');
  const token = useSelector((state) => state.auth.token);

  const handleOK = async (signatureData) => {
    try {
      const formData = new FormData();
      formData.append('contractId', contractId);
      formData.append('contractorId', contractorId);
      formData.append('signatureData', signatureData);
      formData.append('signedBy', signedBy);

      console.log('📦 FormData being sent:');
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      const response = await fetch('https://alpinum-consulting.vercel.app/api/sign', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.text();
      console.log('🧾 API raw response:', result);

      if (!response.ok) {
        throw new Error('Failed to save signature');
      }

      Toast.show({ type: 'success', text1: 'Signature saved' });
      onConfirm();
    } catch (err) {
      setError(err.message);
      console.error('❌ Signature upload error:', err);
      Toast.show({ type: 'error', text1: 'Error', text2: err.message });
    }
  };

  const handleClear = () => {
    signatureRef.current.clearSignature();
  };

  const handleEmpty = () => {
    setError('Please provide a signature');
  };

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Sign Contract</Text>

          <View style={styles.signatureContainer}>
            <Signature
              ref={signatureRef}
              onOK={handleOK}
              onEmpty={handleEmpty}
              descriptionText="Sign below"
              clearText="Clear"
              confirmText="Save"
              webStyle={`.m-signature-pad--footer { display: none; margin: 0; }`}
            />
          </View>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.clearBtn} onPress={handleClear}>
              <Text style={styles.clearText}>Clear</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveBtn} onPress={() => signatureRef.current.readSignature()}>
              <Text style={styles.saveText}>Save Signature</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SignatureModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    width: '95%',
    height: Platform.OS === 'ios' ? 400 : 450,
    borderRadius: 10,
    padding: 16,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  signatureContainer: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    overflow: 'hidden',
  },
  error: {
    color: 'red',
    marginVertical: 8,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  clearBtn: {
    padding: 10,
    marginRight: 10,
  },
  clearText: {
    color: '#999',
    fontWeight: 'bold',
  },
  saveBtn: {
    backgroundColor: '#f47920',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 6,
    marginRight: 10,
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelBtn: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 6,
  },
  cancelText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
