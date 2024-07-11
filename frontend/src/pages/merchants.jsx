import { useEffect, useState } from "react";
import { useGetUsersQuery } from "../redux/api/usersApiSlice";
import Message from "../components/Message";
import Loader from "../components/Loader";
import defaultProfilePicture from "../Images/Header/workplace-business-modern-male-accessories-laptop-black-background.jpg";

const UsersList = () => {
    const { data: users, refetch, isLoading, error } = useGetUsersQuery();
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        refetch();
    }, [refetch]);

    useEffect(() => {
        if (error) {
            console.error("Error fetching users:", error);
        }
        if (users) {
            console.log("Fetched users:", users);
        }
    }, [error, users]);

    const handleShowMore = () => {
        setShowMore(!showMore);
    };

    const merchants = users?.filter(user => user.isMerchant) || [];

    return (
        <div className="pt-40 px-40 pb-20 bg-gray-800 text-white shadow-lg">
            <h1 className="text-3xl pb-10 text-center border-b-2 border-white font-semibold mb-4">
                PROPIETORS
            </h1>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error?.data?.message || error.error}</Message>
            ) : merchants.length > 0 ? (
                <>
                    <div className="mt-10">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {merchants.slice(0, showMore ? merchants.length : 4).map((user) => (
                                <div key={user._id} className="bg-gray-700 p-6 rounded-lg shadow-lg text-center">
                                    <img
                                        src={user.profilePicture ? `/${user.profilePicture}` : defaultProfilePicture}
                                        alt={user.username}
                                        className="w-24 h-24 rounded-full mx-auto mb-4"
                                        />
                                    <h3 className="text-lg font-semibold py-6">{user.username}</h3>
                                    <button className="bg-blue-600 hover:bg-white hover:text-blue-600 text-white py-1 px-4 rounded-full">
                                        View Profile
                                    </button>
                                </div>
                            ))}
                        </div>
                        {merchants.length > 4 && (
                            <div className="text-center mt-6">
                                <button
                                    onClick={handleShowMore}
                                    className="bg-blue-900 hover:text-blue-900 hover:bg-white text-white py-2 px-6 rounded-full"
                                >
                                    {showMore ? "Show Less" : "Show More"}
                                </button>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <Message variant="info">No merchants found</Message>
            )}
        </div>
    );
};

export default UsersList;
