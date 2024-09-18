import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Icons} from "@/components/icons";
import React from "react";
import {Button} from "@/components/ui/button";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Title} from "@/components/ui/title";
import {ContentBody} from "@/components/ui/contentBody";
import moment from "moment";
import {ClockIcon} from "@radix-ui/react-icons";
import {Link} from "react-router-dom";

export default function Notification() {

    const notifications = [
        {
            employee: {
                id: 1,
                name: "John smith",
                avatar: null
            },
            id: 1,
            title: "Building excitement with contingency plans",
            date: "2023/10/10"
        },
        {
            employee: {
                id: 1,
                name: "Jennifer Taylor",
                avatar: "https://img.freepik.com/free-photo/portrait-happy-manager-holding-leather-case_1262-5329.jpg"
            },
            id: 2,
            title: 'Urging caution with appointment dynamics',
            date: "2023/10/10"
        },
        {
            employee: {
                id: 1,
                name: "Maria Green",
                avatar: null
            },
            id: 3,
            title: 'Leveraging the law of attraction with self-esteemjrefhdscburefgudsufreejdsgjfregdsufuierfgduisgufregugeruefgugrefugugrfeudsgufreegugrfuedgufergdugfufduierfduiy',
            date: "2024/7/28"
        },
        {
            employee: {
                id: 1,
                name: "Stephanie Hall",
                avatar: "https://uralsiz.ru/upload/iblock/281/Vyezd-menedzhera-kompanii-TD-URALSIZ-na-predpriyatie-dlya-prezentatsii-rabochey-odezhdy.jpg"
            },
            id: 4,
            title: 'Boost their courage',
            date: "2022/10/10"
        },
        {
            employee: {
                id: 1,
                name: "Victoria Barnes",
                avatar: null
            },
            id: 5,
            title: 'Building Curiosity',
            date: "2024/8/20"
        }
    ]
    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className='flex items-center gap-2'>
                    <Button
                        size={'icon'}
                        variant="outline" shade={'gray'} className="w-8 h-8 border-gray-100">
                        {Icons.alert()}
                    </Button>
                </div>
            </PopoverTrigger>
            <PopoverContent align="end"
                            className="max-h-[calc(100vh-10rem)] overflow-y-auto tiny-scrollbar px-0 pb-0 max-w-[500px] sm:w-full">
                <div className="px-4">
                    {notifications.map((item) => (
                        <div key={item.id} className="flex gap-2 [&:not(:last-child)]:border-b py-2">
                            <Avatar className="w-10 h-10">
                                <AvatarImage src={item.employee?.avatar || ''}/>
                                <AvatarFallback className="bg-info-translucent text-info">{item.employee.name ?
                                    `${item.employee.name.split(' ')[0].charAt(0)}${item.employee.name.split(' ')[1]?.charAt(0)}`.toUpperCase()
                                    : ''}</AvatarFallback>
                            </Avatar>
                            <div>
                                <Title size={'md'}>{item.employee.name}</Title>
                                <ContentBody className="break-all !text-100">{item.title}</ContentBody>
                                <ContentBody size="sm"
                                             className="mt-1 flex gap-1"><ClockIcon/> {moment(item.date).fromNow()}
                                </ContentBody>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="border-t text-center pb-1">
                    <Link className="py-3 w-full block text-label-md" to={"#"}>See All Notifications</Link>
                </div>
            </PopoverContent>
        </Popover>
    )
}