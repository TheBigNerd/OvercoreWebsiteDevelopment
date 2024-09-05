import { GetServerSidePropsContext } from 'next';
import { parseCookies } from 'nookies';

interface Props {
    userBasket: string;
}

const RetrieveBasket: React.FC<Props> = ({ userBasket }) => {
    const cookies = parseCookies();
    const id = cookies.id || '';
    console.log(id);
    return <div>{userBasket}</div>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const cookies = parseCookies(context);
    const userBasket = cookies.userBasket || '';

    return {
        props: {
            userBasket,
        },
    };
}

export default RetrieveBasket;