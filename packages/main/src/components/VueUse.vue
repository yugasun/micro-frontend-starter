<script lang="ts" setup>
import { useEyeDropper } from '@vueuse/core';

const { isSupported, open, sRGBHex } = useEyeDropper();
</script>
<template>
    <section
        v-if="isSupported"
        class="vueuse-box p-5 text-primary-dark dark:text-ternary-light"
    >
        <h3 class="title font-bold">Vueuse Example</h3>
        <div>isSupported: {{ isSupported }}</div>
        <div>
            sRGBHex: <span :style="{ color: sRGBHex }">{{ sRGBHex }}</span>
        </div>

        <div>
            <el-button :disabled="!isSupported" @click="() => open()">
                {{
                    isSupported
                        ? 'Open Eye Dropper'
                        : 'Not Supported by Your Browser'
                }}
            </el-button>
        </div>
    </section>
</template>
<style lang="scss" scoped>
.vueuse-box {
    margin: 20px auto;
}
</style>
