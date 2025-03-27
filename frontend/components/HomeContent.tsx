"use client";
import CardMain from "./Card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutGrid, AlignJustify } from "lucide-react";
import Footer from "./Footer";

function HomeContent() {
  return (
    <div>
      <Tabs defaultValue="grid" className="max-w-7xl mx-auto ">
        <div className="flex justify-between mr-6 mb-8">
          <h1 className="flex items-center text-2xl font-semibold ">
            Welcome to FlexiConvertIt
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
    </div>
  );
}

export default HomeContent;
