'use client'

import CardContent from "@/components/cards/CardContent";
import CardMain from "@/components/cards/CardMain";

// import { welcome } from "@/actions/home";
// import ModalTest from "@/components/modal/ModalTest";
// import Image from "next/image";
// import Link from 'next/link'

export default function Home() {

  return (
    <CardMain 
      breadcrumbs={[
        {
          label: 'Dashboard',
        }
      ]}
    >
      <CardContent title="test">
      Ut in ea error laudantium quas omnis officia. Sit sed praesentium voluptas. Corrupti inventore consequatur nisi necessitatibus modi consequuntur soluta id. Enim autem est esse natus assumenda. Non sunt dignissimos officiis expedita. Consequatur sint repellendus voluptas. Quidem sit est nulla ullam. Suscipit debitis ullam iusto dolorem animi dolorem numquam. Enim fuga ipsum dolor nulla quia ut. Rerum dolor voluptatem et deleniti libero totam numquam nobis distinctio. Sit sint aut. Consequatur rerum in.
      </CardContent>
    </CardMain>
  );
}
