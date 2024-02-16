import ShowLinks from '@/components/links/show-links';
import { getLinksByUser } from '@/server/actions/links';
import { getUser } from '@/server/utils/users';

const DashboardPage = async () => {
    const user = await getUser();


    if (!user) {
        return <div>Error</div>;
    }
    return (

        <ShowLinks user={user} />
    )
}



export default DashboardPage