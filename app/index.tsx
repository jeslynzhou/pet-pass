import { Redirect } from 'expo-router';

// You must use 'export default'
export default function Index() {
  return <Redirect href="/(auth)/login" />;
}