import Layout from "@/components/Layout";

const Index = () => {
  return (
    <Layout title="ina">
      <div className="flex items-center justify-center">
        <img
          src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2Y1N2U5ZmEzZDUxNjRlMjhjM2E3NjMwM2Q2OGVjOTY3YTIxZmJjMCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/p6RVGDmsXrONHCYG3R/giphy.gif"
          alt="Water Refreshing GIF by xponentialdesign"
          className="w-1/2 rounded-lg"
        />
        <div className="w-1/2 text-center">
          <h1 className="text-4xl font-bold">Building the Future</h1>
        </div>
      </div>
    </Layout>
  );
};

export default Index;