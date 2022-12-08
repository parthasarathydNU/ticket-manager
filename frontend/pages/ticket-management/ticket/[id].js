import Layout from '../../../components/layout/layout'
import { getAllTicketIds, getTicketData } from '../../../lib/tickets';

export default function Ticket({ ticketData }) {
    return (
      <Layout>

        <div>Ticket details page</div>
      </Layout>
    );
  }

  export async function getStaticPaths() {
    // Return a list of possible value for id
      // Returns an array that looks like this:
      // [
      //   {
      //     params: {
      //       id: 'ssg-ssr'
      //     }
      //   },
      //   {
      //     params: {
      //       id: 'pre-rendering'
      //     }
      //   }
      // ]
  
    const paths = getAllTicketIds();
    return {
      paths,
      fallback: false,
    }
  }

  export async function getStaticProps({ params }) {
    // Fetch necessary data for the blog post using params.id
    // the params object is the one that is returned from the 
    // getStaticPaths function
    const postData = await getTicketData(params.id);
    return {
        props: {
            postData,
        }
    }


  }