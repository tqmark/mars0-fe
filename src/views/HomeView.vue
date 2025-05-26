<script setup lang="ts">
import Hero from '../components/Hero.vue'
import Story from '@/components/Story.vue'
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import Card from '@/components/Card.vue'
import tars from '@/assets/tars.svg';
import case1 from '@/assets/case1.svg';
import kipp from '@/assets/kipp.svg';
import comingSoon from '@/assets/coming-soon.svg';
</script>

<template>
    <div class="mx-auto">
      <Hero />
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-8">
        <Card :image="case1" title="CASE" description="Start by reviewing requirements..." />
        <Card :image="tars" title="TARS" description="Generates detailed test cases..." />
        <Card :image="kipp" title="KIPP" description="Convert manual test cases..." />
        <Card :image="comingSoon" title="Coming soon..." description="" />
      </div>
      <Story />
      <Footer />
    </div>
</template>
