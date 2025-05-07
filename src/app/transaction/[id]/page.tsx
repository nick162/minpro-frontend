import GetTransactionById from "@/features/transaction.ts/getTransactions/components/GetTransactionById";

const TransactionPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  return <GetTransactionById transactionId={id} />;
};

export default TransactionPage;
