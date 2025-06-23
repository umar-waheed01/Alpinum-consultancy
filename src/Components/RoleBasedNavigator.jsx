// src/Navigations/RoleBasedNavigator.js
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useSelector } from 'react-redux';
import CompanyWrapper from '../Company/Navigations/CompanyWrapper';
import ContractorWrapper from '../Contractor/Navigations/ContractorWrapper';

const RoleBasedNavigator = () => {
  const user = useSelector((state) => state.auth.user);
  const [roleChecked, setRoleChecked] = useState(false);

  useEffect(() => {
    if (user) setRoleChecked(true);
  }, [user]);

  if (!roleChecked) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (user?.role === 'COMPANY') {
    return <CompanyWrapper />;
  }

  return <ContractorWrapper />;
};

export default RoleBasedNavigator;
