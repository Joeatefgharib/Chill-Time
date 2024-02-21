
const ActorCard = (props) => {
    const { image, id } = props;

    return (
        <div className=" relative w-[330px] h-[335px] mt-[150px] mr-[100px]">
            <img className=" w-[240px] h-[350px] rounded-2xl before:bg-cover" src={`${image}`} alt={`${id}`} />
        </div>
    );
};

export default ActorCard;
