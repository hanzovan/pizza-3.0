import { SectionHeader } from "../molecules";

export function InfoSection() {
    return (
        <>
            <section id="about">
                <SectionHeader subHeader="read story" mainHeader="About Us" />
                <div className="flex flex-col gap-4 max-w-md mx-auto text-center text-gray-500">
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam tenetur, magnam laboriosam fugiat nesciunt tempore quos dolore, vero labore explicabo doloremque debitis, reiciendis nulla necessitatibus eveniet quas illum architecto voluptates.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda itaque quaerat, nisi voluptas magnam iste sed placeat eligendi, excepturi est similique voluptatem, cupiditate fugiat! Quos aspernatur libero excepturi blanditiis accusamus.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat quis voluptatem, perferendis nisi eos officiis nam impedit quidem ex rerum nostrum dolor inventore magnam vitae tenetur non cum possimus optio.
                    </p>
                </div>
            </section>
            <section id="contact" className="text-center">
                <SectionHeader subHeader="Don't hesitate" mainHeader="Contact Us" />
                <a href="tel:+123 456 789" className="text-4xl font-bold text-gray-600">
                    +123 456 789
                </a>
            </section>
        </>
    )
}