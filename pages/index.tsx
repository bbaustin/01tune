import type { NextPage } from "next";
import Layout from "../components/Layout";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/components/Home.module.scss";

const Home: NextPage = () => {
  return (
    <Layout>
      <h1>Welcome</h1>
    </Layout>
  );
};

export default Home;
