import { useLocation } from 'react-router-dom';
import { useGetYoutubeAnalysisQuery } from '@/apis/analyze';

const YoutubeResultPage = () => {
  const {
    state: { link },
  } = useLocation();

  const { data } = useGetYoutubeAnalysisQuery(link);
  return (
    <>
      <h1>{data?.video.title}</h1>
      <iframe width="560" height="315" src={data?.video.url} title="Youtube Player"></iframe>
    </>
  );
};

export default YoutubeResultPage;
