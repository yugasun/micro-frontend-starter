<script lang="ts" setup>
import { isExternal } from '@/utils/url';
import { RouterLink } from 'vue-router';
import { computed } from 'vue';

const props = defineProps<{
    to: string;
}>();

const isExternalPath = computed(() => {
    return isExternal(props.to);
});

const type = computed(() => {
    return isExternalPath.value ? 'a' : RouterLink;
});

function linkProps(to: string) {
    if (isExternalPath.value) {
        return {
            to: to,
            href: to,
            target: '_blank',
            rel: 'noopener',
        };
    }
    return {
        to: to,
    };
}
</script>
<template>
    <RouterLink :to="linkProps(to).to">
        <slot />
    </RouterLink>
</template>
