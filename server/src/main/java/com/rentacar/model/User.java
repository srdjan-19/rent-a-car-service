package com.rentacar.model;

import com.rentacar.model.enumeration.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Where;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Collection;
import java.util.Collections;

import static com.rentacar.utilities.ValidationConstraints.*;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user")
@Where(clause = "is_deleted='false'")
public class User extends BaseEntity implements UserDetails {

	@NotBlank
	@Size(max = FIRST_NAME_SIZE)
	private String firstName;

	@NotBlank
	@Size(max = LAST_NAME_SIZE)
	private String lastName;

	@NotNull
	@Enumerated(EnumType.STRING)
	private Role role;

	@NotBlank
	@Size(max = EMAIL_SIZE)
	private String email;

	@NotBlank
	@Size(max = PASSWORD_HASH_SIZE)
	private String password;

	@NotBlank
	@Size(max = PHONE_NUMBER_SIZE)
	private String phoneNumber;

	@NotNull
	@JoinColumn(name = "address_id")
	@OneToOne(fetch = FetchType.EAGER)
	private Address address;

	@NotNull
	@Column(name = "is_enabled")
	private Boolean isEnabled;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return Collections.singletonList(new SimpleGrantedAuthority(this.getRole().toString()));
	}

	private Role getRole() {
		return role;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return email;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() { return isEnabled; }



}
