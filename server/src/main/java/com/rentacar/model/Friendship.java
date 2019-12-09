package com.rentacar.model;

import com.rentacar.model.enumeration.FriendshipStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "friendship")
@Where(clause = "is_deleted='false'")
public class Friendship extends BaseEntity {

    @NotNull
    @JoinColumn(name = "first_member_id")
    @ManyToOne(fetch = FetchType.EAGER)
    private User firstMember;

    @NotNull
    @JoinColumn(name = "second_member_id")
    @ManyToOne(fetch = FetchType.EAGER)
    private User secondMember;

    @NotNull
    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private FriendshipStatus status;

    @NotNull
    @Column(name = "sender")
    @Type(type = "uuid-char")
    private UUID sender;


}
