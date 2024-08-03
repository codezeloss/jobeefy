export default async function JobDetailsPage({params}: { params: { jobId: string } }) {
    return (
        <div>JobDetailsPage: {params.jobId}</div>
    );
}
