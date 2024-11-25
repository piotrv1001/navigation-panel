"use client";

import CardWrapper from "./card-wrapper";
import NavigationForm from "./navigation-form";

export default function NavigationPanel() {
  return (
    <CardWrapper>
      <NavigationForm onSubmit={(data) => console.log(data)} />
    </CardWrapper>
  );
}
