import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { theme } from "../../styles";
import { Step } from "../core";

export const HowItWorks = () => {
  return (
    <View style={theme.section}>
      <View style={theme.header}>
        <Text style={theme.title}>How It Works</Text>
        <Text style={theme.subtitle}>Simple steps to peace of mind.</Text>
      </View>

      {/* Steps */}
      <View style={theme.stepsContainer}>
        <Step
          number="1"
          title="Tag it."
          description="Attach a custom QR tag to your keys, bag, or tech gadgets in seconds."
        />

        <Step
          number="2"
          title="Relax."
          description="Go about your day knowing our empathetic system is watching over your things."
        />

        <Step
          number="3"
          title="Recover."
          description="Get notified the moment it's found and chat securely with the finder."
        />
      </View>
    </View>
  );
};
