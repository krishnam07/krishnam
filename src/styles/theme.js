import { StyleSheet } from 'react-native';

export const colors = {
  bg: '#0f1724',
  card: '#142850',
  text: '#e6eef8',
  subtext: '#cfe6ff',
  primary: '#06b6d4',
  success: '#10b981',
  warning: '#ff9a3c',
};

export const appStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: 14,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  title: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '700',
  },
  subtitle: {
    color: colors.subtext,
    fontSize: 12,
    marginTop: 4,
  },
  input: {
    backgroundColor: '#0c1a2d',
    borderColor: '#2b4c73',
    borderWidth: 1,
    borderRadius: 10,
    color: colors.text,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    fontSize: 14,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  iconTile: {
    flex: 1,
    backgroundColor: '#133153',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  iconLabel: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '600',
  },
});
