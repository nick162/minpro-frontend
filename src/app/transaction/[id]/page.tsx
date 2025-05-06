import GetTransactionById from "@/features/transaction.ts/getTransactions/components/GetTransactionById";

interface Props {
  params: { id: string };
}

const TransactionPage = ({ params }: Props) => {
  return <GetTransactionById transactionId={params.id} />;
};

export default TransactionPage;
