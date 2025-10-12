import { Redirect, Slot, useSegments } from "expo-router";
import { useUserStore } from "../store/useUserStore";

export default function ProtectedLayout() {
  const user = useUserStore((state) => state.user);
  const segments = useSegments();

  const inAdminGroup = segments[1] === "(admin)";
  const inTabsGroup = segments[1] === "(tabs)";

  // Se não está logado, redireciona para login
  if (!user) {
    return <Redirect href="/login" />;
  }

  // Se usuário comum tentando acessar área admin, redireciona
  if (inAdminGroup && user.role !== "admin") {
    return <Redirect href="/(protected)/(tabs)/home" />;
  }

  // Se admin tentando acessar área de usuário, redireciona
  if (inTabsGroup && user.role === "admin") {
    return <Redirect href="/(protected)/(admin)/homeAdmin" />;
  }

  return <Slot />;
}
