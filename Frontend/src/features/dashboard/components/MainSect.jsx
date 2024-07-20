function MainSect() {
  return (
    <section>
      <div className="w-full grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <article className="w-full border rounded-md p-4 sm:p-2 shadow-sm flex flex-col gap-4">
          <h2>Total Penjualan</h2>
          <p className="font-medium text-lg">120</p>
        </article>
        <article className="w-full border rounded-md p-4 sm:p-2 shadow-sm flex flex-col gap-4">
          <h2>Profit</h2>
          <p className="font-medium text-lg">120</p>
        </article>
        <article className="w-full border rounded-md p-4 sm:p-2 shadow-sm flex flex-col gap-4">
          <h2>Affiliates</h2>
          <p className="font-medium text-lg">120</p>
        </article>
        <article className="w-full border rounded-md p-4 sm:p-2 shadow-sm flex flex-col gap-4">
          <h2>Total Produk</h2>
          <p className="font-medium text-lg">120</p>
        </article>
      </div>
    </section>
  )
}

export default MainSect