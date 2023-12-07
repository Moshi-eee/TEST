<script setup>
import { onMounted, ref, watch } from "vue";
import { useAssetMaintenanceStore } from "@/stores/assetMaintenanceStore";

const assetStore = useAssetMaintenanceStore();

onMounted(async () => {
  fetch_item();
  getDate();
});

const emit = defineEmits(["item"], ["qty"]);
const items = defineProps({ transactionData: Object });

const totalItems = ref(0);
const dateStr = ref("");

const fetch_item = async () => {
  await assetStore.fetch_item();
  emit("item", assetStore.get_item.data);
};
const getDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  dateStr.value = `${month}/${day}/${year}`;
};

watch(items.transactionData, () => {
  totalItems.value = 0;
  for (let i = 0; i < items.transactionData.length; i++) {
    totalItems.value = totalItems.value + Number(items.transactionData[i].qty);
    emit("qty", totalItems.value);
  }
});
</script>
<template><div></div></template>
