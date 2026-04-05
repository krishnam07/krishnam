import React from "react";
import { View, Text, Pressable } from "react-native";
import { Search } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

import { styles, theme } from "../../styles";
import { FooterLink } from "../core";

export const Footer = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.footer}>
      {/* Brand */}
      <View style={styles.footerBrand}>
        <View style={styles.footerLogoRow}>
          <Search size={20} color={theme.colors.primary} />
          <Text style={styles.footerLogoText}>Find My Things</Text>
        </View>

        <Text style={styles.footerTagline}>
          Empathetic concierge for your everyday things.
        </Text>
      </View>

      {/* Links */}
      <View style={styles.footerLinks}>
        <FooterLink label="Privacy Policy" />
        <FooterLink label="Terms of Service" />
        <FooterLink label="Help Center" />
        <FooterLink
          label="Contact Us"
          onPress={() => navigation.navigate("ContactUs")}
        />
      </View>

      {/* Bottom */}
      <Text style={styles.footerBottom}>
        © 2026 Find My Things. All rights reserved.
      </Text>
    </View>
  );
};
