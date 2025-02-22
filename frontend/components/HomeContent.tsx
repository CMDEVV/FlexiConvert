"use client";
import CardMain from "./Card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutGrid, AlignJustify } from "lucide-react";

function HomeContent() {
  return (
    // <div className="max-w-7xl mx-auto">
    // <div className="flex justify-between mb-6">
    // <h1 className="items-end text-2xl font-semibold mb-4 bg-green-500 ">
    // <h1 className="flex items-center text-2xl font-semibold ">
    //   Welcome to FlexiConvert
    // </h1>

    <Tabs defaultValue="grid" className="max-w-7xl mx-auto ">
      <div className="flex justify-between mr-6 mb-8">
        <h1 className="flex items-center text-2xl font-semibold ">
          Welcome to FlexiConvert
        </h1>

        <TabsList>
          <TabsTrigger value="grid">
            <LayoutGrid />
          </TabsTrigger>
          <TabsTrigger value="list">
            <AlignJustify />
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="grid">
        <CardMain data={{ name: "grid" }} />
      </TabsContent>
      <TabsContent value="list">
        <CardMain data={{ name: "list" }} />
      </TabsContent>
    </Tabs>
    // </div>

    // <div className="bg-white rounded-lg shadow-md p-6">
    //   <p className="text-gray-600">
    //     This is your main content area. Add your content here.
    //   </p>
    // </div>
    // </div>
  );
}

export default HomeContent;
