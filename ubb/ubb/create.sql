create table bug_ticket (assigned_to bigint, created_by bigint, id bigint not null auto_increment, project_id bigint, description varchar(255), name varchar(255), priority varchar(255), status varchar(255), primary key (id)) engine=InnoDB;
create table comment (created_at datetime(6), id bigint not null auto_increment, ticket_id bigint, user_id bigint, content varchar(255), primary key (id)) engine=InnoDB;
create table company (id bigint not null auto_increment, company_name varchar(255) not null, primary key (id)) engine=InnoDB;
create table file (id bigint not null auto_increment, project_id bigint, file_name varchar(255), file_type varchar(255), file_content BLOB, primary key (id)) engine=InnoDB;
create table project (end_date date, start_date date, company_id bigint, id bigint not null auto_increment, project_name varchar(255), primary key (id)) engine=InnoDB;
create table project_users (project_id bigint not null, user_id bigint not null, primary key (project_id, user_id)) engine=InnoDB;
create table role (id bigint not null auto_increment, role_name varchar(255) not null, primary key (id)) engine=InnoDB;
create table user (company_id bigint, id bigint not null auto_increment, email varchar(255) not null, name varchar(255), password varchar(255), primary key (id)) engine=InnoDB;
create table user_roles (role_id bigint not null, user_id bigint not null, primary key (role_id, user_id)) engine=InnoDB;
alter table role add constraint UKiubw515ff0ugtm28p8g3myt0h unique (role_name);
alter table user add constraint UKob8kqyqqgmefl0aco34akdtpe unique (email);
alter table bug_ticket add constraint FK9psgsr1uxbx24t3dyat1n9ffr foreign key (assigned_to) references user (id);
alter table bug_ticket add constraint FKnyrx5p68a5sogdtb6npyshyes foreign key (created_by) references user (id);
alter table bug_ticket add constraint FKfu2u2lolasf0s83scpeciv8q8 foreign key (project_id) references project (id);
alter table comment add constraint FKeqiv1owal53xrdbid976rhhk1 foreign key (ticket_id) references bug_ticket (id);
alter table comment add constraint FK8kcum44fvpupyw6f5baccx25c foreign key (user_id) references user (id);
alter table file add constraint FK9xpbf8klk9il032sq5xupl1f foreign key (project_id) references project (id);
alter table project add constraint FK76fngi71pfr8phbobe5pq0swd foreign key (company_id) references company (id);
alter table project_users add constraint FKswc4g4h18lbxsl9obvo97lnbl foreign key (user_id) references user (id);
alter table project_users add constraint FK9at0ei37rls7vd2m6sh92668h foreign key (project_id) references project (id);
alter table user add constraint FK2yuxsfrkkrnkn5emoobcnnc3r foreign key (company_id) references company (id);
alter table user_roles add constraint FKrhfovtciq1l558cw6udg0h0d3 foreign key (role_id) references role (id);
alter table user_roles add constraint FK55itppkw3i07do3h7qoclqd4k foreign key (user_id) references user (id);
create table bug_ticket (assigned_to bigint, created_by bigint, id bigint not null auto_increment, project_id bigint, description varchar(255), name varchar(255), priority varchar(255), status varchar(255), primary key (id)) engine=InnoDB;
create table comment (created_at datetime(6), id bigint not null auto_increment, ticket_id bigint, user_id bigint, content varchar(255), primary key (id)) engine=InnoDB;
create table company (id bigint not null auto_increment, company_name varchar(255) not null, primary key (id)) engine=InnoDB;
create table file (id bigint not null auto_increment, project_id bigint, file_name varchar(255), file_type varchar(255), file_content BLOB, primary key (id)) engine=InnoDB;
create table project (end_date date, start_date date, company_id bigint, id bigint not null auto_increment, project_name varchar(255), primary key (id)) engine=InnoDB;
create table project_users (project_id bigint not null, user_id bigint not null, primary key (project_id, user_id)) engine=InnoDB;
create table role (id bigint not null auto_increment, role_name varchar(255) not null, primary key (id)) engine=InnoDB;
create table user (company_id bigint, id bigint not null auto_increment, email varchar(255) not null, name varchar(255), password varchar(255), primary key (id)) engine=InnoDB;
create table user_roles (role_id bigint not null, user_id bigint not null, primary key (role_id, user_id)) engine=InnoDB;
alter table role add constraint UKiubw515ff0ugtm28p8g3myt0h unique (role_name);
alter table user add constraint UKob8kqyqqgmefl0aco34akdtpe unique (email);
alter table bug_ticket add constraint FK9psgsr1uxbx24t3dyat1n9ffr foreign key (assigned_to) references user (id);
alter table bug_ticket add constraint FKnyrx5p68a5sogdtb6npyshyes foreign key (created_by) references user (id);
alter table bug_ticket add constraint FKfu2u2lolasf0s83scpeciv8q8 foreign key (project_id) references project (id);
alter table comment add constraint FKeqiv1owal53xrdbid976rhhk1 foreign key (ticket_id) references bug_ticket (id);
alter table comment add constraint FK8kcum44fvpupyw6f5baccx25c foreign key (user_id) references user (id);
alter table file add constraint FK9xpbf8klk9il032sq5xupl1f foreign key (project_id) references project (id);
alter table project add constraint FK76fngi71pfr8phbobe5pq0swd foreign key (company_id) references company (id);
alter table project_users add constraint FKswc4g4h18lbxsl9obvo97lnbl foreign key (user_id) references user (id);
alter table project_users add constraint FK9at0ei37rls7vd2m6sh92668h foreign key (project_id) references project (id);
alter table user add constraint FK2yuxsfrkkrnkn5emoobcnnc3r foreign key (company_id) references company (id);
alter table user_roles add constraint FKrhfovtciq1l558cw6udg0h0d3 foreign key (role_id) references role (id);
alter table user_roles add constraint FK55itppkw3i07do3h7qoclqd4k foreign key (user_id) references user (id);
create table bug_ticket (assigned_to bigint, created_by bigint, id bigint not null auto_increment, project_id bigint, description varchar(255), name varchar(255), priority varchar(255), status varchar(255), primary key (id)) engine=InnoDB;
create table comment (created_at datetime(6), id bigint not null auto_increment, ticket_id bigint, user_id bigint, content varchar(255), primary key (id)) engine=InnoDB;
create table company (id bigint not null auto_increment, company_name varchar(255) not null, primary key (id)) engine=InnoDB;
create table file (id bigint not null auto_increment, project_id bigint, file_name varchar(255), file_type varchar(255), file_content BLOB, primary key (id)) engine=InnoDB;
create table project (end_date date, start_date date, company_id bigint, id bigint not null auto_increment, project_name varchar(255), primary key (id)) engine=InnoDB;
create table project_users (project_id bigint not null, user_id bigint not null, primary key (project_id, user_id)) engine=InnoDB;
create table role (id bigint not null auto_increment, role_name varchar(255) not null, primary key (id)) engine=InnoDB;
create table user (company_id bigint, id bigint not null auto_increment, email varchar(255) not null, name varchar(255), password varchar(255), primary key (id)) engine=InnoDB;
create table user_roles (role_id bigint not null, user_id bigint not null, primary key (role_id, user_id)) engine=InnoDB;
alter table role add constraint UKiubw515ff0ugtm28p8g3myt0h unique (role_name);
alter table user add constraint UKob8kqyqqgmefl0aco34akdtpe unique (email);
alter table bug_ticket add constraint FK9psgsr1uxbx24t3dyat1n9ffr foreign key (assigned_to) references user (id);
alter table bug_ticket add constraint FKnyrx5p68a5sogdtb6npyshyes foreign key (created_by) references user (id);
alter table bug_ticket add constraint FKfu2u2lolasf0s83scpeciv8q8 foreign key (project_id) references project (id);
alter table comment add constraint FKeqiv1owal53xrdbid976rhhk1 foreign key (ticket_id) references bug_ticket (id);
alter table comment add constraint FK8kcum44fvpupyw6f5baccx25c foreign key (user_id) references user (id);
alter table file add constraint FK9xpbf8klk9il032sq5xupl1f foreign key (project_id) references project (id);
alter table project add constraint FK76fngi71pfr8phbobe5pq0swd foreign key (company_id) references company (id);
alter table project_users add constraint FKswc4g4h18lbxsl9obvo97lnbl foreign key (user_id) references user (id);
alter table project_users add constraint FK9at0ei37rls7vd2m6sh92668h foreign key (project_id) references project (id);
alter table user add constraint FK2yuxsfrkkrnkn5emoobcnnc3r foreign key (company_id) references company (id);
alter table user_roles add constraint FKrhfovtciq1l558cw6udg0h0d3 foreign key (role_id) references role (id);
alter table user_roles add constraint FK55itppkw3i07do3h7qoclqd4k foreign key (user_id) references user (id);
create table bug_ticket (assigned_to bigint, created_by bigint, id bigint not null auto_increment, project_id bigint, description varchar(255), name varchar(255), priority varchar(255), status varchar(255), primary key (id)) engine=InnoDB;
create table comment (created_at datetime(6), id bigint not null auto_increment, ticket_id bigint, user_id bigint, content varchar(255), primary key (id)) engine=InnoDB;
create table company (id bigint not null auto_increment, company_name varchar(255) not null, primary key (id)) engine=InnoDB;
create table file (id bigint not null auto_increment, project_id bigint, file_name varchar(255), file_type varchar(255), file_content BLOB, primary key (id)) engine=InnoDB;
create table project (end_date date, start_date date, company_id bigint, id bigint not null auto_increment, project_name varchar(255), primary key (id)) engine=InnoDB;
create table project_users (project_id bigint not null, user_id bigint not null, primary key (project_id, user_id)) engine=InnoDB;
create table role (id bigint not null auto_increment, role_name varchar(255) not null, primary key (id)) engine=InnoDB;
create table user (company_id bigint, id bigint not null auto_increment, email varchar(255) not null, name varchar(255), password varchar(255), primary key (id)) engine=InnoDB;
create table user_roles (role_id bigint not null, user_id bigint not null, primary key (role_id, user_id)) engine=InnoDB;
alter table role add constraint UKiubw515ff0ugtm28p8g3myt0h unique (role_name);
alter table user add constraint UKob8kqyqqgmefl0aco34akdtpe unique (email);
alter table bug_ticket add constraint FK9psgsr1uxbx24t3dyat1n9ffr foreign key (assigned_to) references user (id);
alter table bug_ticket add constraint FKnyrx5p68a5sogdtb6npyshyes foreign key (created_by) references user (id);
alter table bug_ticket add constraint FKfu2u2lolasf0s83scpeciv8q8 foreign key (project_id) references project (id);
alter table comment add constraint FKeqiv1owal53xrdbid976rhhk1 foreign key (ticket_id) references bug_ticket (id);
alter table comment add constraint FK8kcum44fvpupyw6f5baccx25c foreign key (user_id) references user (id);
alter table file add constraint FK9xpbf8klk9il032sq5xupl1f foreign key (project_id) references project (id);
alter table project add constraint FK76fngi71pfr8phbobe5pq0swd foreign key (company_id) references company (id);
alter table project_users add constraint FKswc4g4h18lbxsl9obvo97lnbl foreign key (user_id) references user (id);
alter table project_users add constraint FK9at0ei37rls7vd2m6sh92668h foreign key (project_id) references project (id);
alter table user add constraint FK2yuxsfrkkrnkn5emoobcnnc3r foreign key (company_id) references company (id);
alter table user_roles add constraint FKrhfovtciq1l558cw6udg0h0d3 foreign key (role_id) references role (id);
alter table user_roles add constraint FK55itppkw3i07do3h7qoclqd4k foreign key (user_id) references user (id);
create table bug_ticket (assigned_to bigint, created_by bigint, id bigint not null auto_increment, project_id bigint, description varchar(255), name varchar(255), priority varchar(255), status varchar(255), primary key (id)) engine=InnoDB;
create table comment (created_at datetime(6), id bigint not null auto_increment, ticket_id bigint, user_id bigint, content varchar(255), primary key (id)) engine=InnoDB;
create table company (id bigint not null auto_increment, company_name varchar(255) not null, primary key (id)) engine=InnoDB;
create table file (id bigint not null auto_increment, project_id bigint, file_name varchar(255), file_type varchar(255), file_content BLOB, primary key (id)) engine=InnoDB;
create table project (end_date date, start_date date, company_id bigint, id bigint not null auto_increment, project_name varchar(255), primary key (id)) engine=InnoDB;
create table project_users (project_id bigint not null, user_id bigint not null, primary key (project_id, user_id)) engine=InnoDB;
create table role (id bigint not null auto_increment, role_name varchar(255) not null, primary key (id)) engine=InnoDB;
create table user (company_id bigint, id bigint not null auto_increment, email varchar(255) not null, name varchar(255), password varchar(255), primary key (id)) engine=InnoDB;
create table user_roles (role_id bigint not null, user_id bigint not null, primary key (role_id, user_id)) engine=InnoDB;
alter table role add constraint UKiubw515ff0ugtm28p8g3myt0h unique (role_name);
alter table user add constraint UKob8kqyqqgmefl0aco34akdtpe unique (email);
alter table bug_ticket add constraint FK9psgsr1uxbx24t3dyat1n9ffr foreign key (assigned_to) references user (id);
alter table bug_ticket add constraint FKnyrx5p68a5sogdtb6npyshyes foreign key (created_by) references user (id);
alter table bug_ticket add constraint FKfu2u2lolasf0s83scpeciv8q8 foreign key (project_id) references project (id);
alter table comment add constraint FKeqiv1owal53xrdbid976rhhk1 foreign key (ticket_id) references bug_ticket (id);
alter table comment add constraint FK8kcum44fvpupyw6f5baccx25c foreign key (user_id) references user (id);
alter table file add constraint FK9xpbf8klk9il032sq5xupl1f foreign key (project_id) references project (id);
alter table project add constraint FK76fngi71pfr8phbobe5pq0swd foreign key (company_id) references company (id);
alter table project_users add constraint FKswc4g4h18lbxsl9obvo97lnbl foreign key (user_id) references user (id);
alter table project_users add constraint FK9at0ei37rls7vd2m6sh92668h foreign key (project_id) references project (id);
alter table user add constraint FK2yuxsfrkkrnkn5emoobcnnc3r foreign key (company_id) references company (id);
alter table user_roles add constraint FKrhfovtciq1l558cw6udg0h0d3 foreign key (role_id) references role (id);
alter table user_roles add constraint FK55itppkw3i07do3h7qoclqd4k foreign key (user_id) references user (id);
create table bug_ticket (assigned_to bigint, created_by bigint, id bigint not null auto_increment, project_id bigint, description varchar(255), name varchar(255), priority varchar(255), status varchar(255), primary key (id)) engine=InnoDB;
create table comment (created_at datetime(6), id bigint not null auto_increment, ticket_id bigint, user_id bigint, content varchar(255), primary key (id)) engine=InnoDB;
create table company (id bigint not null auto_increment, company_name varchar(255) not null, primary key (id)) engine=InnoDB;
create table file (id bigint not null auto_increment, project_id bigint, file_name varchar(255), file_type varchar(255), file_content BLOB, primary key (id)) engine=InnoDB;
create table project (end_date date, start_date date, company_id bigint, id bigint not null auto_increment, project_name varchar(255), primary key (id)) engine=InnoDB;
create table project_users (project_id bigint not null, user_id bigint not null, primary key (project_id, user_id)) engine=InnoDB;
create table role (id bigint not null auto_increment, role_name varchar(255) not null, primary key (id)) engine=InnoDB;
create table user (company_id bigint, id bigint not null auto_increment, email varchar(255) not null, name varchar(255), password varchar(255), primary key (id)) engine=InnoDB;
create table user_roles (role_id bigint not null, user_id bigint not null, primary key (role_id, user_id)) engine=InnoDB;
alter table role add constraint UKiubw515ff0ugtm28p8g3myt0h unique (role_name);
alter table user add constraint UKob8kqyqqgmefl0aco34akdtpe unique (email);
alter table bug_ticket add constraint FK9psgsr1uxbx24t3dyat1n9ffr foreign key (assigned_to) references user (id);
alter table bug_ticket add constraint FKnyrx5p68a5sogdtb6npyshyes foreign key (created_by) references user (id);
alter table bug_ticket add constraint FKfu2u2lolasf0s83scpeciv8q8 foreign key (project_id) references project (id);
alter table comment add constraint FKeqiv1owal53xrdbid976rhhk1 foreign key (ticket_id) references bug_ticket (id);
alter table comment add constraint FK8kcum44fvpupyw6f5baccx25c foreign key (user_id) references user (id);
alter table file add constraint FK9xpbf8klk9il032sq5xupl1f foreign key (project_id) references project (id);
alter table project add constraint FK76fngi71pfr8phbobe5pq0swd foreign key (company_id) references company (id);
alter table project_users add constraint FKswc4g4h18lbxsl9obvo97lnbl foreign key (user_id) references user (id);
alter table project_users add constraint FK9at0ei37rls7vd2m6sh92668h foreign key (project_id) references project (id);
alter table user add constraint FK2yuxsfrkkrnkn5emoobcnnc3r foreign key (company_id) references company (id);
alter table user_roles add constraint FKrhfovtciq1l558cw6udg0h0d3 foreign key (role_id) references role (id);
alter table user_roles add constraint FK55itppkw3i07do3h7qoclqd4k foreign key (user_id) references user (id);
create table bug_ticket (assigned_to bigint, created_by bigint, id bigint not null auto_increment, project_id bigint, description varchar(255), name varchar(255), priority varchar(255), status varchar(255), primary key (id)) engine=InnoDB;
create table comment (created_at datetime(6), id bigint not null auto_increment, ticket_id bigint, user_id bigint, content varchar(255), primary key (id)) engine=InnoDB;
create table company (id bigint not null auto_increment, company_name varchar(255) not null, primary key (id)) engine=InnoDB;
create table file (id bigint not null auto_increment, project_id bigint, file_name varchar(255), file_type varchar(255), file_content BLOB, primary key (id)) engine=InnoDB;
create table project (end_date date, start_date date, company_id bigint, id bigint not null auto_increment, project_name varchar(255), primary key (id)) engine=InnoDB;
create table project_users (project_id bigint not null, user_id bigint not null, primary key (project_id, user_id)) engine=InnoDB;
create table role (id bigint not null auto_increment, role_name varchar(255) not null, primary key (id)) engine=InnoDB;
create table user (company_id bigint, id bigint not null auto_increment, email varchar(255) not null, name varchar(255), password varchar(255), primary key (id)) engine=InnoDB;
create table user_roles (role_id bigint not null, user_id bigint not null, primary key (role_id, user_id)) engine=InnoDB;
alter table role add constraint UKiubw515ff0ugtm28p8g3myt0h unique (role_name);
alter table user add constraint UKob8kqyqqgmefl0aco34akdtpe unique (email);
alter table bug_ticket add constraint FK9psgsr1uxbx24t3dyat1n9ffr foreign key (assigned_to) references user (id);
alter table bug_ticket add constraint FKnyrx5p68a5sogdtb6npyshyes foreign key (created_by) references user (id);
alter table bug_ticket add constraint FKfu2u2lolasf0s83scpeciv8q8 foreign key (project_id) references project (id);
alter table comment add constraint FKeqiv1owal53xrdbid976rhhk1 foreign key (ticket_id) references bug_ticket (id);
alter table comment add constraint FK8kcum44fvpupyw6f5baccx25c foreign key (user_id) references user (id);
alter table file add constraint FK9xpbf8klk9il032sq5xupl1f foreign key (project_id) references project (id);
alter table project add constraint FK76fngi71pfr8phbobe5pq0swd foreign key (company_id) references company (id);
alter table project_users add constraint FKswc4g4h18lbxsl9obvo97lnbl foreign key (user_id) references user (id);
alter table project_users add constraint FK9at0ei37rls7vd2m6sh92668h foreign key (project_id) references project (id);
alter table user add constraint FK2yuxsfrkkrnkn5emoobcnnc3r foreign key (company_id) references company (id);
alter table user_roles add constraint FKrhfovtciq1l558cw6udg0h0d3 foreign key (role_id) references role (id);
alter table user_roles add constraint FK55itppkw3i07do3h7qoclqd4k foreign key (user_id) references user (id);
create table bug_ticket (assigned_to bigint, created_by bigint, id bigint not null auto_increment, project_id bigint, description varchar(255), name varchar(255), priority varchar(255), status varchar(255), primary key (id)) engine=InnoDB;
create table comment (created_at datetime(6), id bigint not null auto_increment, ticket_id bigint, user_id bigint, content varchar(255), primary key (id)) engine=InnoDB;
create table company (id bigint not null auto_increment, company_name varchar(255) not null, primary key (id)) engine=InnoDB;
create table file (id bigint not null auto_increment, project_id bigint, file_name varchar(255), file_type varchar(255), file_content BLOB, primary key (id)) engine=InnoDB;
create table project (end_date date, start_date date, company_id bigint, id bigint not null auto_increment, project_name varchar(255), primary key (id)) engine=InnoDB;
create table project_users (project_id bigint not null, user_id bigint not null, primary key (project_id, user_id)) engine=InnoDB;
create table role (id bigint not null auto_increment, role_name varchar(255) not null, primary key (id)) engine=InnoDB;
create table user (company_id bigint, id bigint not null auto_increment, email varchar(255) not null, name varchar(255), password varchar(255), primary key (id)) engine=InnoDB;
create table user_roles (role_id bigint not null, user_id bigint not null, primary key (role_id, user_id)) engine=InnoDB;
alter table role add constraint UKiubw515ff0ugtm28p8g3myt0h unique (role_name);
alter table user add constraint UKob8kqyqqgmefl0aco34akdtpe unique (email);
alter table bug_ticket add constraint FK9psgsr1uxbx24t3dyat1n9ffr foreign key (assigned_to) references user (id);
alter table bug_ticket add constraint FKnyrx5p68a5sogdtb6npyshyes foreign key (created_by) references user (id);
alter table bug_ticket add constraint FKfu2u2lolasf0s83scpeciv8q8 foreign key (project_id) references project (id);
alter table comment add constraint FKeqiv1owal53xrdbid976rhhk1 foreign key (ticket_id) references bug_ticket (id);
alter table comment add constraint FK8kcum44fvpupyw6f5baccx25c foreign key (user_id) references user (id);
alter table file add constraint FK9xpbf8klk9il032sq5xupl1f foreign key (project_id) references project (id);
alter table project add constraint FK76fngi71pfr8phbobe5pq0swd foreign key (company_id) references company (id);
alter table project_users add constraint FKswc4g4h18lbxsl9obvo97lnbl foreign key (user_id) references user (id);
alter table project_users add constraint FK9at0ei37rls7vd2m6sh92668h foreign key (project_id) references project (id);
alter table user add constraint FK2yuxsfrkkrnkn5emoobcnnc3r foreign key (company_id) references company (id);
alter table user_roles add constraint FKrhfovtciq1l558cw6udg0h0d3 foreign key (role_id) references role (id);
alter table user_roles add constraint FK55itppkw3i07do3h7qoclqd4k foreign key (user_id) references user (id);
create table bug_ticket (assigned_to bigint, created_by bigint, id bigint not null auto_increment, project_id bigint, description varchar(255), name varchar(255), priority varchar(255), status varchar(255), primary key (id)) engine=InnoDB;
create table comment (created_at datetime(6), id bigint not null auto_increment, ticket_id bigint, user_id bigint, content varchar(255), primary key (id)) engine=InnoDB;
create table company (id bigint not null auto_increment, company_name varchar(255) not null, primary key (id)) engine=InnoDB;
create table file (id bigint not null auto_increment, project_id bigint, file_name varchar(255), file_type varchar(255), file_content BLOB, primary key (id)) engine=InnoDB;
create table project (end_date date, start_date date, company_id bigint, id bigint not null auto_increment, project_name varchar(255), primary key (id)) engine=InnoDB;
create table project_users (project_id bigint not null, user_id bigint not null, primary key (project_id, user_id)) engine=InnoDB;
create table role (id bigint not null auto_increment, role_name varchar(255) not null, primary key (id)) engine=InnoDB;
create table user (company_id bigint, id bigint not null auto_increment, email varchar(255) not null, name varchar(255), password varchar(255), primary key (id)) engine=InnoDB;
create table user_roles (role_id bigint not null, user_id bigint not null, primary key (role_id, user_id)) engine=InnoDB;
alter table role add constraint UKiubw515ff0ugtm28p8g3myt0h unique (role_name);
alter table user add constraint UKob8kqyqqgmefl0aco34akdtpe unique (email);
alter table bug_ticket add constraint FK9psgsr1uxbx24t3dyat1n9ffr foreign key (assigned_to) references user (id);
alter table bug_ticket add constraint FKnyrx5p68a5sogdtb6npyshyes foreign key (created_by) references user (id);
alter table bug_ticket add constraint FKfu2u2lolasf0s83scpeciv8q8 foreign key (project_id) references project (id);
alter table comment add constraint FKeqiv1owal53xrdbid976rhhk1 foreign key (ticket_id) references bug_ticket (id);
alter table comment add constraint FK8kcum44fvpupyw6f5baccx25c foreign key (user_id) references user (id);
alter table file add constraint FK9xpbf8klk9il032sq5xupl1f foreign key (project_id) references project (id);
alter table project add constraint FK76fngi71pfr8phbobe5pq0swd foreign key (company_id) references company (id);
alter table project_users add constraint FKswc4g4h18lbxsl9obvo97lnbl foreign key (user_id) references user (id);
alter table project_users add constraint FK9at0ei37rls7vd2m6sh92668h foreign key (project_id) references project (id);
alter table user add constraint FK2yuxsfrkkrnkn5emoobcnnc3r foreign key (company_id) references company (id);
alter table user_roles add constraint FKrhfovtciq1l558cw6udg0h0d3 foreign key (role_id) references role (id);
alter table user_roles add constraint FK55itppkw3i07do3h7qoclqd4k foreign key (user_id) references user (id);
create table bug_ticket (assigned_to bigint, created_by bigint, id bigint not null auto_increment, project_id bigint, description varchar(255), name varchar(255), priority varchar(255), status varchar(255), primary key (id)) engine=InnoDB;
create table comment (created_at datetime(6), id bigint not null auto_increment, ticket_id bigint, user_id bigint, content varchar(255), primary key (id)) engine=InnoDB;
create table company (id bigint not null auto_increment, company_name varchar(255) not null, primary key (id)) engine=InnoDB;
create table file (id bigint not null auto_increment, project_id bigint, file_name varchar(255), file_type varchar(255), file_content BLOB, primary key (id)) engine=InnoDB;
create table project (end_date date, start_date date, company_id bigint, id bigint not null auto_increment, project_name varchar(255), primary key (id)) engine=InnoDB;
create table project_users (project_id bigint not null, user_id bigint not null, primary key (project_id, user_id)) engine=InnoDB;
create table role (id bigint not null auto_increment, role_name varchar(255) not null, primary key (id)) engine=InnoDB;
create table user (company_id bigint, id bigint not null auto_increment, email varchar(255) not null, name varchar(255), password varchar(255), primary key (id)) engine=InnoDB;
create table user_roles (role_id bigint not null, user_id bigint not null, primary key (role_id, user_id)) engine=InnoDB;
alter table role add constraint UKiubw515ff0ugtm28p8g3myt0h unique (role_name);
alter table user add constraint UKob8kqyqqgmefl0aco34akdtpe unique (email);
alter table bug_ticket add constraint FK9psgsr1uxbx24t3dyat1n9ffr foreign key (assigned_to) references user (id);
alter table bug_ticket add constraint FKnyrx5p68a5sogdtb6npyshyes foreign key (created_by) references user (id);
alter table bug_ticket add constraint FKfu2u2lolasf0s83scpeciv8q8 foreign key (project_id) references project (id);
alter table comment add constraint FKeqiv1owal53xrdbid976rhhk1 foreign key (ticket_id) references bug_ticket (id);
alter table comment add constraint FK8kcum44fvpupyw6f5baccx25c foreign key (user_id) references user (id);
alter table file add constraint FK9xpbf8klk9il032sq5xupl1f foreign key (project_id) references project (id);
alter table project add constraint FK76fngi71pfr8phbobe5pq0swd foreign key (company_id) references company (id);
alter table project_users add constraint FKswc4g4h18lbxsl9obvo97lnbl foreign key (user_id) references user (id);
alter table project_users add constraint FK9at0ei37rls7vd2m6sh92668h foreign key (project_id) references project (id);
alter table user add constraint FK2yuxsfrkkrnkn5emoobcnnc3r foreign key (company_id) references company (id);
alter table user_roles add constraint FKrhfovtciq1l558cw6udg0h0d3 foreign key (role_id) references role (id);
alter table user_roles add constraint FK55itppkw3i07do3h7qoclqd4k foreign key (user_id) references user (id);
create table bug_ticket (assigned_to bigint, created_by bigint, id bigint not null auto_increment, project_id bigint, description varchar(255), name varchar(255), priority varchar(255), status varchar(255), primary key (id)) engine=InnoDB;
create table comment (created_at datetime(6), id bigint not null auto_increment, ticket_id bigint, user_id bigint, content varchar(255), primary key (id)) engine=InnoDB;
create table company (id bigint not null auto_increment, company_name varchar(255) not null, primary key (id)) engine=InnoDB;
create table file (id bigint not null auto_increment, project_id bigint, file_name varchar(255), file_type varchar(255), file_content BLOB, primary key (id)) engine=InnoDB;
create table project (end_date date, start_date date, company_id bigint, id bigint not null auto_increment, project_name varchar(255), primary key (id)) engine=InnoDB;
create table project_users (project_id bigint not null, user_id bigint not null, primary key (project_id, user_id)) engine=InnoDB;
create table role (id bigint not null auto_increment, role_name varchar(255) not null, primary key (id)) engine=InnoDB;
create table user (company_id bigint, id bigint not null auto_increment, email varchar(255) not null, name varchar(255), password varchar(255), primary key (id)) engine=InnoDB;
create table user_roles (role_id bigint not null, user_id bigint not null, primary key (role_id, user_id)) engine=InnoDB;
alter table role add constraint UKiubw515ff0ugtm28p8g3myt0h unique (role_name);
alter table user add constraint UKob8kqyqqgmefl0aco34akdtpe unique (email);
alter table bug_ticket add constraint FK9psgsr1uxbx24t3dyat1n9ffr foreign key (assigned_to) references user (id);
alter table bug_ticket add constraint FKnyrx5p68a5sogdtb6npyshyes foreign key (created_by) references user (id);
alter table bug_ticket add constraint FKfu2u2lolasf0s83scpeciv8q8 foreign key (project_id) references project (id);
alter table comment add constraint FKeqiv1owal53xrdbid976rhhk1 foreign key (ticket_id) references bug_ticket (id);
alter table comment add constraint FK8kcum44fvpupyw6f5baccx25c foreign key (user_id) references user (id);
alter table file add constraint FK9xpbf8klk9il032sq5xupl1f foreign key (project_id) references project (id);
alter table project add constraint FK76fngi71pfr8phbobe5pq0swd foreign key (company_id) references company (id);
alter table project_users add constraint FKswc4g4h18lbxsl9obvo97lnbl foreign key (user_id) references user (id);
alter table project_users add constraint FK9at0ei37rls7vd2m6sh92668h foreign key (project_id) references project (id);
alter table user add constraint FK2yuxsfrkkrnkn5emoobcnnc3r foreign key (company_id) references company (id);
alter table user_roles add constraint FKrhfovtciq1l558cw6udg0h0d3 foreign key (role_id) references role (id);
alter table user_roles add constraint FK55itppkw3i07do3h7qoclqd4k foreign key (user_id) references user (id);
create table bug_ticket (assigned_to bigint, created_by bigint, id bigint not null auto_increment, project_id bigint, description varchar(255), name varchar(255), priority varchar(255), status varchar(255), primary key (id)) engine=InnoDB;
create table comment (created_at datetime(6), id bigint not null auto_increment, ticket_id bigint, user_id bigint, content varchar(255), primary key (id)) engine=InnoDB;
create table company (id bigint not null auto_increment, company_name varchar(255) not null, primary key (id)) engine=InnoDB;
create table file (id bigint not null auto_increment, project_id bigint, file_name varchar(255), file_type varchar(255), file_content BLOB, primary key (id)) engine=InnoDB;
create table project (end_date date, start_date date, company_id bigint, id bigint not null auto_increment, project_name varchar(255), primary key (id)) engine=InnoDB;
create table project_users (project_id bigint not null, user_id bigint not null, primary key (project_id, user_id)) engine=InnoDB;
create table role (id bigint not null auto_increment, role_name varchar(255) not null, primary key (id)) engine=InnoDB;
create table user (company_id bigint, id bigint not null auto_increment, email varchar(255) not null, name varchar(255), password varchar(255), primary key (id)) engine=InnoDB;
create table user_roles (role_id bigint not null, user_id bigint not null, primary key (role_id, user_id)) engine=InnoDB;
alter table role add constraint UKiubw515ff0ugtm28p8g3myt0h unique (role_name);
alter table user add constraint UKob8kqyqqgmefl0aco34akdtpe unique (email);
alter table bug_ticket add constraint FK9psgsr1uxbx24t3dyat1n9ffr foreign key (assigned_to) references user (id);
alter table bug_ticket add constraint FKnyrx5p68a5sogdtb6npyshyes foreign key (created_by) references user (id);
alter table bug_ticket add constraint FKfu2u2lolasf0s83scpeciv8q8 foreign key (project_id) references project (id);
alter table comment add constraint FKeqiv1owal53xrdbid976rhhk1 foreign key (ticket_id) references bug_ticket (id);
alter table comment add constraint FK8kcum44fvpupyw6f5baccx25c foreign key (user_id) references user (id);
alter table file add constraint FK9xpbf8klk9il032sq5xupl1f foreign key (project_id) references project (id);
alter table project add constraint FK76fngi71pfr8phbobe5pq0swd foreign key (company_id) references company (id);
alter table project_users add constraint FKswc4g4h18lbxsl9obvo97lnbl foreign key (user_id) references user (id);
alter table project_users add constraint FK9at0ei37rls7vd2m6sh92668h foreign key (project_id) references project (id);
alter table user add constraint FK2yuxsfrkkrnkn5emoobcnnc3r foreign key (company_id) references company (id);
alter table user_roles add constraint FKrhfovtciq1l558cw6udg0h0d3 foreign key (role_id) references role (id);
alter table user_roles add constraint FK55itppkw3i07do3h7qoclqd4k foreign key (user_id) references user (id);
