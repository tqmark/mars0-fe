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
      <div class="flex justify-center gap-8 p-8 pt-12">
        <Card :image="case1" title="CASE" description="Start by reviewing requirement to detects ambiguities, inconsistencies then make document clear and complete.  " />
        <Card :image="tars" title="TARS" description="Generates detailed test cases that cover many scenarios, from typical user interactions to overlooked edge cases. " />
        <Card :image="kipp" title="KIPP" description="Convert manual test cases into fully functional automation test scripts. Accelerates continuous testing and feedback." />
        <Card :image="comingSoon" title="Coming soon..." description="" />
      </div>
      <Story />
      <Footer />
    </div>
</template>
