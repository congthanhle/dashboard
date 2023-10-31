<template>
  <aside class="sticky top-[65px] h-[calc(100vh-65px)] py-5">
    <div
      class="flex h-full w-full flex-col gap-5 overflow-y-auto rounded-md border bg-card pb-5 scrollbar-thin scrollbar-thumb-input scrollbar-thumb-rounded-md">
      <SidebarItem :links="menu" />

      <div class="mt-auto">
        <button class="inline-flex items-center gap-4 p-3 px-4 text-left text-[15px]" @click="handleLogout">
          <Icon name="heroicons:arrow-left-on-rectangle" class="h-5 w-5 text-muted-foreground" />
          <p class="truncate">
            Logout
          </p>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">

const router = useRouter()
const {signOutUser} = useFirebaseAuth();
const menu = [
  {
    title: "Dashboard",
    icon: "heroicons:home",
  },

  {
    title: "Products",
    icon: "heroicons:cube",
    items: [
      { title: "List", route: "/products" },
    ],
  },
  {
    title: "Users",
    icon: "heroicons:user",
    items: [
      { title: "List", route: "/users" },
    ],
  },
];
const handleLogout = async () => {
  const logOut = signOutUser();
  logOut && router.push("/login")
}
</script>
