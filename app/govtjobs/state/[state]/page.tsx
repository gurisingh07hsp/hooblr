import React from 'react'
import SearchGovtjobsPage from "@/components/SearchGovtjobsPage";
import type { Metadata } from 'next'

interface PageProps {
  params: {
    category: string;
    state: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  function capitalizeWords(str: string) {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  }
  const state = capitalizeWords(decodeURIComponent(params?.state?.replace(/-/g, " ")));
  let title = `Latest Govt Jobs in ${state} – Apply Now`;
  let description = 'Find the latest government job openings in India. Explore SSC, railway, banking, police, and state govt vacancies and apply online quickly through Hooblr.';
  
  switch (state) {
  case ' Andhra Pradesh':
    description = 'Find the latest govt jobs in Andhra Pradesh on Hooblr. Explore notifications, eligibility, salary details, and apply online for top vacancies.'
    break;

  case 'Arunachal Pradesh':
    title = 'Govt Jobs in Arunachal Pradesh – Apply Today'
    description = 'Discover active govt jobs in Arunachal Pradesh. Browse openings, check qualifications and salary updates, and apply online through Hooblr.'
    break;

  case 'Assam':
    title = 'Latest Govt Jobs in Assam – Apply Now';
    description = 'Explore current govt jobs in Assam on Hooblr. View notifications, eligibility, salary info, and apply online for top government vacancies.';
    break;
  case 'Bihar':
    title = 'Govt Jobs in Bihar – Apply Online Today';
    description = 'Search updated govt jobs in Bihar on Hooblr. Check notifications, salary, eligibility, and submit applications for top government posts.';
    break;
  case 'Chhattisgarh':
    title = 'Latest Govt Jobs in Chhattisgarh – Apply Now';
    description = 'Stay updated with govt jobs in Chhattisgarh. Explore hiring notices, eligibility, salary details, and apply online through Hooblr easily.';
    break;
  case 'Goa':
    title = 'Govt Jobs in Goa – Apply Online Today';
    description = 'Browse govt jobs in Goa on Hooblr. Find new openings, salary updates, eligibility criteria, and apply online for government career roles.';
    break;
  case 'Gujarat':
    title = 'Latest Govt Jobs in Gujarat – Apply Now';
    description = 'Find the latest govt jobs in Gujarat. Explore notifications, qualifications, salary details, and apply online for government vacancies.';
    break;
  case 'Haryana':
    title = 'Govt Jobs in Haryana – Apply Online Now';
    description = 'Discover active govt jobs in Haryana on Hooblr. Check salary, eligibility, vacancy details, and apply online for government opportunities.';
    break;
  case 'Himachal Pradesh':
    title = 'Govt Jobs in Himachal Pradesh – Apply Now';
    description = 'Explore govt jobs in Himachal Pradesh. Stay updated with notifications, eligibility, salary info, and apply online on Hooblr today.';
    break;
  case 'Jharkhand':
    title = 'Latest Govt Jobs in Jharkhand – Apply Now';
    description = 'Search current govt jobs in Jharkhand. Browse openings, salary updates, eligibility criteria, and apply online for government posts.';
    break;
  case 'Karnataka':
    title = 'Govt Jobs in Karnataka – Apply Online';
    description = 'Find updated govt jobs in Karnataka on Hooblr. Check vacancies, salary, eligibility requirements, and apply online with confidence.';
    break;
  case 'Kerala':
    title = 'Latest Govt Jobs in Kerala – Apply Today';
    description = 'Discover govt jobs in Kerala. Browse notifications, eligibility conditions, salary updates, and apply online through Hooblr today.';
    break;
  case 'Madhya Pradesh':
    title = 'Govt Jobs in Madhya Pradesh – Apply Now';
    description = 'Explore active govt jobs in Madhya Pradesh. View openings, salary details, eligibility criteria, and apply online for top roles.';
    break;
  case 'Maharashtra':
    title = 'Latest Govt Jobs in Maharashtra – Apply Now';
    description = 'Stay updated with govt jobs in Maharashtra. Find vacancies, salary updates, eligibility info, and apply online through Hooblr.';
    break;
  case 'Manipur':
    title = 'Govt Jobs in Manipur – Apply Online Today';
    description = 'Search latest govt jobs in Manipur. Review vacancy notifications, eligibility, salary details, and apply online on Hooblr.';
    break;
  case 'Meghalaya':
    title = 'Latest Govt Jobs in Meghalaya – Apply Now';
    description = 'Find govt jobs in Meghalaya on Hooblr. Explore openings, eligibility, salary updates, and submit online applications easily.';
    break;
  case 'Mizoram':
    title = 'Govt Jobs in Mizoram – Apply Online Now';
    description = 'Browse govt jobs in Mizoram. Get updates on notifications, salary, eligibility, and apply online for government vacancies.';
    break;
  case 'Nagaland':
    title = 'Latest Govt Jobs in Nagaland – Apply Now';
    description = 'Explore govt jobs in Nagaland. Check qualifications, salary, vacancy details, and apply online through Hooblr with ease.';
    break;
  case 'Odisha':
    title = 'Govt Jobs in Odisha – Apply Online Today';
    description = 'Discover govt jobs in Odisha on Hooblr. View openings, eligibility norms, salary updates, and apply online for government roles.';
    break;
  case 'Punjab':
    title = 'Latest Govt Jobs in Punjab – Apply Now';
    description = 'Search govt jobs in Punjab. Explore hiring alerts, salary details, eligibility requirements, and apply online easily through Hooblr.';
    break;
  case 'Rajasthan':
    title = 'Govt Jobs in Rajasthan – Apply Online';
    description = 'Find active govt jobs in Rajasthan. Browse notifications, eligibility, salary info, and apply online for government positions.';
    break;
  case 'Sikkim':
    title = 'Latest Govt Jobs in Sikkim – Apply Today';
    description = 'Explore govt jobs in Sikkim. Check recruitment alerts, salary, eligibility, and apply online quickly with Hooblr.';
    break;
  case 'Tamil Nadu':
    title = 'Govt Jobs in Tamil Nadu – Apply Online';
    description = 'Discover govt jobs in Tamil Nadu. Stay updated with notifications, salary details, eligibility, and apply online through Hooblr.';
    break;
  case 'Telangana':
    title = 'Latest Govt Jobs in Telangana – Apply Now';
    description = 'Find current govt jobs in Telangana. Browse vacancies, eligibility details, salary info, and apply instantly on Hooblr.';
    break;
  case 'Tripura':
    title = 'Govt Jobs in Tripura – Apply Online Now';
    description = 'Explore govt jobs in Tripura. Check salary, eligibility, vacancy updates, and apply online easily through Hooblr.';
    break;
  case 'Uttar Pradesh':
    title = 'Latest Govt Jobs in Uttar Pradesh – Apply Now';
    description = 'Search govt jobs in Uttar Pradesh. View hiring notifications, eligibility, salary updates, and apply online for top posts.';
    break;
  case 'Uttarakhand':
    title = 'Govt Jobs in Uttarakhand – Apply Today';
    description = 'Discover govt jobs in Uttarakhand. Explore openings, salary updates, eligibility criteria, and apply online through Hooblr.';
    break;
  case 'West Bengal':
    title = 'Latest Govt Jobs in West Bengal – Apply Now';
    description = 'Stay updated with govt jobs in West Bengal. Check vacancies, salary, eligibility, and apply online for government roles.';
    break;
  case 'Andaman and Nicobar Islands':
    title = 'Govt Jobs in Andaman & Nicobar – Apply Now';
    description = 'Find govt jobs in Andaman & Nicobar. Explore openings, eligibility, salary updates, and apply online for government vacancies.';
    break;
  case 'Chandigarh':
    title = 'Latest Govt Jobs in Chandigarh – Apply Now';
    description = 'Browse govt jobs in Chandigarh. View notifications, eligibility, salary info, and apply online through Hooblr quickly.';
    break;
  case 'Dadra and Nagar Haveli and Daman and Diu':
    title = 'Govt Jobs in DNHD&D – Apply Online Now';
    description = 'Explore govt jobs in Dadra Nagar Haveli & Daman Diu. Check openings, salary updates, eligibility, and apply online easily.';
    break;
  case 'Delhi':
    title = 'Latest Govt Jobs in Delhi – Apply Today';
    description = 'Discover govt jobs in Delhi. Browse vacancies, salary, eligibility details, and submit online applications on Hooblr.';
    break;
  case 'Jammu and Kashmir':
    title = 'Govt Jobs in Jammu & Kashmir – Apply Now';
    description = 'Search govt jobs in Jammu & Kashmir. Explore openings, eligibility, salary updates, and apply online for top roles.';
    break;
  case 'Ladakh':
    title = 'Govt Jobs in Ladakh – Apply Now';
    description = 'Discover govt jobs in Ladakh. Browse vacancies, salary, eligibility details, and submit online applications on Hooblr.';
    break;
  case 'Lakshadweep':
    title = 'Latest Govt Jobs in Lakshadweep – Apply Now';
    description = 'Find govt jobs in Lakshadweep. Check eligibility, salary details, vacancy updates, and apply online through Hooblr.';
    break;
  case 'Puducherry':
    title = 'Govt Jobs in Puducherry – Apply Online Now';
    description = 'Explore govt jobs in Puducherry. View hiring alerts, salary info, eligibility, and apply online for government vacancies.';
    break;
  default:
  title = `Latest Govt Jobs in ${state} – Apply Now`;
  description = 'Find the latest government job openings in India. Explore SSC, railway, banking, police, and state govt vacancies and apply online quickly through Hooblr.';
}

  return {
    title: title,
    description: description,
    alternates: {
      canonical: `/govtjobs/state/${params.state}`,
    },
  }
}

const page = ({ params }: PageProps) => {
  return (
      <SearchGovtjobsPage params={params} />
  )
}

export default page
